package fernlabs.com.stroberiwrites.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import fernlabs.com.stroberiwrites.dto.PostRequestDTO;
import fernlabs.com.stroberiwrites.dto.PostResponseDTO;
import fernlabs.com.stroberiwrites.service.PostService;

/*
MENTAL MODEL — the HTTP layer for posts
=======================================
Layers in this app (top to bottom — request travels DOWN, response travels UP):

    Browser / curl
        ↓ HTTP request
    Controller   ← YOU ARE HERE: parses URL, headers, JSON body. Knows about HTTP.
        ↓ plain Java call
    Service      ← business logic, transactions. Knows nothing about HTTP.
        ↓ plain Java call
    Repository   ← database queries (JPA). Knows nothing about HTTP or business rules.
        ↓ SQL
    SQLite database

The controller's ONLY job is translating HTTP ↔ Java method calls. It should be
thin — no business logic here. If a method does anything more than "call service
and return", that's a smell.

DJANGO ANALOGUE: this whole class is a urls.py + views.py combo:
  @RequestMapping("/blog/posts") on the class  =  path("blog/posts/", include(...))
  @GetMapping("/{id}")                          =  path("<int:id>/", view_function)

ANNOTATION CHEAT SHEET:
  @RequestMapping("/blog/posts") at class level → every route in this file starts with /blog/posts
  @GetMapping / @PostMapping / @PutMapping / @DeleteMapping → match HTTP method + sub-path
  @PathVariable                                → grab value from URL ({id} in the URL → Long id param)
  @RequestBody                                 → parse the JSON request body into a Java object
  @Valid                                       → run the @NotBlank/@Size validators on that object
                                                 BEFORE the method body runs. If invalid → auto-400.
*/
@RestController
@RequestMapping("/blog/posts")
public class PostController {
    // The controller depends on the service. We don't `new PostService()` here —
    // Spring creates one PostService bean at startup and HANDS IT TO US via the
    // constructor below. This is "dependency injection". Why? Because then in
    // tests we can swap in a fake PostService, and Spring can manage one shared
    // instance instead of creating new ones per request.
    private final PostService postService;

    // Constructor injection: Spring sees this constructor at startup, looks at
    // its parameters, finds beans matching each type, and calls it for us.
    // (Since Spring 4.3, when a class has exactly ONE constructor, @Autowired
    // is implicit — you don't have to write it.)
    public PostController(PostService postService) {
        this.postService = postService;
    }

    /*
    GET /blog/posts
    Step-by-step:
      1. Browser sends GET /blog/posts.
      2. Spring matches it to this method via @GetMapping (no sub-path → uses the class-level path).
      3. Method calls the service, gets back a List<PostResponseDTO>.
      4. Because the class is @RestController, Spring serializes that list to JSON automatically.
      5. Response goes back as: 200 OK + [ {id:1,title:...}, {id:2,...} ]
    */
    @GetMapping
    public List<PostResponseDTO> getAllPosts() {
        return postService.getAllPosts();
    }

    /*
    GET /blog/posts/1
    The {id} in the path is a placeholder. @PathVariable Long id tells Spring:
    "take whatever was in {id} and convert it to a Long, then pass it as the `id` param".
    If the user sends /blog/posts/abc → Spring auto-returns 400 because "abc" isn't a Long.
    If the post doesn't exist → service throws PostNotFoundException → that's @ResponseStatus
    annotated with NOT_FOUND, so the client gets a clean 404.
    */
    @GetMapping("/{id}")
    public PostResponseDTO getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    /*
    GET /blog/posts/by-slug/my-first-post
    Why the /by-slug/ prefix? Because we already have GET /{id} above. If we used
    @GetMapping("/{slug}") here, Spring couldn't tell them apart for purely-numeric
    slugs — both routes would compete for /blog/posts/42. Adding /by-slug/ makes
    the intent explicit and unambiguous.
    */
    @GetMapping("/by-slug/{slug}")
    public PostResponseDTO getPostBySlug(@PathVariable String slug) {
        return postService.getPostBySlug(slug);
    }

    /*
    POST /blog/posts (with a JSON body)
    Request body (example):
        { "title": "Hello", "slug": "hello", "content": "..." }

    Flow:
      1. Spring reads the JSON body and parses it into a PostRequestDTO  ← @RequestBody does this
      2. @Valid triggers the @NotBlank / @Size checks on that DTO
            - if any fail → Spring throws MethodArgumentNotValidException → auto-400 response
            - if all pass → continue to step 3
      3. service.createPost(request) does the actual work
      4. The returned PostResponseDTO gets serialized back to JSON (200 OK)
    */
    @PostMapping
    public PostResponseDTO createPost(@Valid @RequestBody PostRequestDTO request) {
        return postService.createPost(request);
    }

    /*
    PUT /blog/posts/1 (with a JSON body)
    PUT means "replace this resource". We grab the id from the URL AND the new
    fields from the body, then ask the service to apply them.
    Same validation rules as createPost — both routes use the same DTO.
    */
    @PutMapping("/{id}")
    public PostResponseDTO updatePost(
            @PathVariable Long id,
            @Valid @RequestBody PostRequestDTO request
    ) {
        return postService.updatePost(id, request);
    }

    /*
    DELETE /blog/posts/1
    Returns void → Spring sends a 200 OK with an empty body.
    If you wanted "204 No Content" instead, you'd add @ResponseStatus(HttpStatus.NO_CONTENT).
    */
    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }
}
