package fernlabs.com.stroberiwrites.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import fernlabs.com.stroberiwrites.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findBySlug(String slug);
    Optional<Category> findByName(String name);
}