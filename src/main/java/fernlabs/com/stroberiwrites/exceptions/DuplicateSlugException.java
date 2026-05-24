package fernlabs.com.stroberiwrites.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateSlugException extends RuntimeException {
    public DuplicateSlugException(String message) {
        super(message);
    }
}
