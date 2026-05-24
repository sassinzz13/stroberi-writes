package fernlabs.com.stroberiwrites.exceptions;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.NOT_FOUND)
public class CategoryNotFoundException extends RuntimeException {

    // We just forward the message up to RuntimeException's constructor via super(...).
    // The message ends up accessible via .getMessage() and shows in stack traces / logs.
    public CategoryNotFoundException(String message) {
        super(message);
    }
}