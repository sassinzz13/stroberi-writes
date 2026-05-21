package fernlabs.com.stroberiwrites.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fernlabs.com.stroberiwrites.dto.PostRequestDTO;
import fernlabs.com.stroberiwrites.dto.PostResponseDTO;
import fernlabs.com.stroberiwrites.exceptions.PostNotFoundException;
import fernlabs.com.stroberiwrites.models.Post;
import fernlabs.com.stroberiwrites.repository.PostRepository;

/*
MENTAL MODEL — the business-logic layer
=======================================
The service sits BETWEEN the controller (HTTP) and the repository (database).

Why have this middle layer at all? Two reasons:
  1. Keeps HTTP concerns out of the database layer and DB concerns out of HTTP.
     If we ever expose the same logic over, say, a gRPC API, we just write a new
     controller — the service stays the same.
  2. It's the natural home for "business rules": validations that depend on
     multiple tables, computed fields, sending emails after save, etc.

@Service is just @Component with a more descriptive name — it tells Spring
"create one instance of this at startup and let other classes inject it".

@Transactional(readOnly = true) AT CLASS LEVEL
   = "wrap every public method in a read-only DB transaction by default".
   Read-only means: if any code in here accidentally calls .save(), it'll fail
   loudly instead of silently committing. Safer default.

@Transactional ON INDIVIDUAL METHODS (create/update/delete below)
   = "override the class-level read-only — this method WRITES, so it needs a
   read-write transaction". Everything inside that method either all commits
   together or all rolls back together. Atomicity, in one annotation.

DTO vs Entity — why the conversion?
   - Post (entity)         = the database shape. Has JPA annotations, getters/setters.
   - PostResponseDTO       = the JSON shape we send to clients.
   They look similar today, but you don't want them coupled — if you later add
   a `password_hash` field to a User entity, you do NOT want it leaking into the
   JSON response. Keeping them separate makes that impossible by construction.
*/
@Service
@Transactional(readOnly = true)
public class PostService {
    // The service depends on the repository, same constructor-injection pattern
    // as the controller. The chain is: Controller → Service → Repository.
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    /*
    Get every post in the database.
    Step-by-step:
      1. postRepository.findAll()       → returns List<Post>   (entities from the DB)
      2. .stream()                      → start a stream pipeline (like Python's iterator chains)
      3. .map(this::convertToDTO)       → for each Post, run convertToDTO(post)  →  List<PostResponseDTO>
      4. .toList()                      → collect the stream back into a List
    The `this::convertToDTO` syntax is a "method reference" — shorthand for `post -> convertToDTO(post)`.
    */
    public List<PostResponseDTO> getAllPosts() {
        return postRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    /*
    Find one post by primary key, or 404.
    findById returns Optional<Post> — Java's "this might be null" wrapper.
      - if present  → .orElseThrow lets the value pass through
      - if empty    → .orElseThrow runs the lambda and throws what it returns
    PostNotFoundException is annotated @ResponseStatus(NOT_FOUND), so Spring
    automatically maps it to an HTTP 404 — we don't have to translate it manually.
    */
    public PostResponseDTO getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("Post not found"));

        return convertToDTO(post);
    }

    /*
    Same shape as getPostById, but uses the custom @Query method we defined on
    the repository. Slugs are how blog posts get nice URLs like
    /blog/posts/by-slug/my-first-post instead of /blog/posts/42.
    */
    public PostResponseDTO getPostBySlug(String slug) {
        Post post = postRepository.findBySlug(slug)
                .orElseThrow(() -> new PostNotFoundException("Post not found"));

        return convertToDTO(post);
    }

    /*
    Create a new post.
    Step-by-step:
      1. Build an empty Post entity (no id yet — DB will assign one).
      2. Copy fields from the incoming DTO onto the entity.
      3. .save(post) → Hibernate generates an INSERT, DB returns the new row,
         JPA populates the id on the entity, returns it back.
      4. Convert the saved entity (now WITH id) to a response DTO and return.

    @Transactional here = read-write transaction. If anything between BEGIN and
    COMMIT throws, the INSERT is rolled back. We never end up with a half-saved post.
    */
    @Transactional
    public PostResponseDTO createPost(PostRequestDTO request) {
        Post post = new Post();

        post.setTitle(request.title());
        post.setSlug(request.slug());
        post.setContent(request.content());

        Post savedPost = postRepository.save(post);

        return convertToDTO(savedPost);
    }

    /*
    Update an existing post — "load, mutate, save".
    Step-by-step:
      1. Load the existing row from the DB (404 if it doesn't exist).
      2. Overwrite its fields with values from the request.
      3. save() → Hibernate sees the entity already has an id, so it generates
         an UPDATE instead of an INSERT.
      4. Convert and return.

    NOTE: inside an @Transactional method, you could technically skip the .save()
    call entirely — Hibernate has "dirty checking" and will auto-flush changes
    to managed entities at commit time. We call save() explicitly here for clarity.
    */
    @Transactional
    public PostResponseDTO updatePost(Long id, PostRequestDTO request) {
        Post existingPost = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("Post not found"));

        existingPost.setTitle(request.title());
        existingPost.setSlug(request.slug());
        existingPost.setContent(request.content());

        Post savedPost = postRepository.save(existingPost);

        return convertToDTO(savedPost);
    }

    /*
    Delete by id, 404 if missing.

    Why findById-then-delete instead of `if (existsById) deleteById`?
    Because between the `exists` check and the `delete` call, another request
    could delete the same row first → a "TOCTOU" race (time-of-check vs time-of-use).
    Doing findById-then-delete inside ONE transaction collapses both into a single
    atomic unit, which avoids that race.
    */
    @Transactional
    public void deletePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("Post not found"));

        postRepository.delete(post);
    }

    /*
    Private helper — entity → DTO conversion in one place.
    `private` because this is implementation detail. Outside callers don't need
    (and shouldn't be able) to call it. Keeping it private also means you can
    refactor it freely without breaking anything outside this file.
    */
    private PostResponseDTO convertToDTO(Post post) {
        return new PostResponseDTO(
                post.getId(),
                post.getTitle(),
                post.getSlug(),
                post.getContent()
        );
    }
}