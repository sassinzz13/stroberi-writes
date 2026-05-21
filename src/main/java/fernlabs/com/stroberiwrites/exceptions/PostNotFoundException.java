package fernlabs.com.stroberiwrites.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/*
MENTAL MODEL — custom exception → HTTP status mapping
=====================================================
Java exceptions come in two flavors:
  - "checked" exceptions (extend Exception): the compiler forces you to catch them
    or declare `throws` on every method. Annoying for app code.
  - "unchecked" exceptions (extend RuntimeException): no `throws` clause needed.
    Use these for "something is wrong, blow up the request" situations.

We extend RuntimeException so we can throw this from anywhere (service, repo)
without polluting every method signature with `throws PostNotFoundException`.

@ResponseStatus(HttpStatus.NOT_FOUND) is the magic line.
When ANY controller method bubbles this exception up uncaught, Spring's default
exception handler sees this annotation and translates the exception into an
HTTP 404 response automatically. Without this annotation, the client would
get a generic HTTP 500.

DJANGO ANALOGUE: this is roughly `raise Http404("Post not found")` —
the framework knows how to turn it into a 404 response.

PATTERN: for every "expected error" kind, define a custom exception class
annotated with the right HTTP status. Examples you might add later:
  @ResponseStatus(CONFLICT)        → DuplicateSlugException
  @ResponseStatus(FORBIDDEN)       → NotPostOwnerException
  @ResponseStatus(UNAUTHORIZED)    → NotLoggedInException
Each one is ~5 lines and gives you clean HTTP semantics for free.
*/
@ResponseStatus(HttpStatus.NOT_FOUND)
public class PostNotFoundException extends RuntimeException {

    // We just forward the message up to RuntimeException's constructor via super(...).
    // The message ends up accessible via .getMessage() and shows in stack traces / logs.
    public PostNotFoundException(String message) {
        super(message);
    }
}