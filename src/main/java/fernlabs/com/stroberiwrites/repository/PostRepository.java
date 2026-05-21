package fernlabs.com.stroberiwrites.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fernlabs.com.stroberiwrites.models.Post;

/*
MENTAL MODEL — the database layer
=================================
This is the closest equivalent Django gives you: think of it as Post.objects.
The repository is the ONLY layer that talks to the database. Nothing above it
should know SQL exists.

WHY IS THIS AN INTERFACE WITH NO IMPLEMENTATION?
Because Spring Data JPA writes the implementation FOR YOU at startup. It scans
for interfaces that extend JpaRepository, generates a proxy class that talks to
Hibernate, and registers it as a bean. Magic, but well-defined magic.

JpaRepository<Post, Long> — two type parameters:
  - Post = the entity class this repo manages
  - Long = the type of that entity's @Id field

From that one line you get all of these for free, with zero code:
  .findAll()          → SELECT * FROM posts
  .findById(id)       → SELECT * FROM posts WHERE id = ?
  .save(post)         → INSERT or UPDATE (it decides based on whether id is set)
  .delete(post)       → DELETE FROM posts WHERE id = ?
  .existsById(id)     → SELECT COUNT(*) ...
  .count()            → row count
  ...and ~20 others.

DJANGO ANALOGUE:
  Post.objects.all()           = postRepository.findAll()
  Post.objects.get(id=1)       = postRepository.findById(1L)         (returns Optional!)
  Post.objects.filter(slug=s)  = a custom method you define here (see below)
  post.save()                  = postRepository.save(post)
  post.delete()                = postRepository.delete(post)

CUSTOM QUERIES — TWO WAYS:
  1. Method-name conventions: just declare `Optional<Post> findBySlug(String slug);`
     and Spring parses the name → generates SELECT WHERE slug = ?. No annotation needed!
     We could literally delete the @Query below and findBySlug would still work.
  2. @Query annotation (below): explicit JPQL/SQL. Use this when the method name
     would get unwieldy, or when you need a JOIN, or want to be explicit.
*/
public interface PostRepository extends JpaRepository<Post, Long> {

    /*
    Custom query — find a post by slug.
    The string inside @Query is JPQL ("Java Persistence Query Language") — it
    looks like SQL but operates on entity classes, not tables:
       SQL:  SELECT * FROM posts WHERE slug = :slug
      JPQL:  SELECT post FROM Post post WHERE post.slug = :slug
              ↑ note "Post" (class name), not "posts" (table name).

    :slug is a named parameter. @Param("slug") binds the method argument to it.

    Returns Optional<Post> because the slug might not exist. Optional forces the
    caller to handle the "not found" case (.orElseThrow / .ifPresent / etc) —
    you can't accidentally use a null without thinking about it.
    */
    @Query("""
        SELECT post
        FROM Post post
        WHERE post.slug = :slug
    """)
    Optional<Post> findBySlug(
            @Param("slug") String slug
    );
}