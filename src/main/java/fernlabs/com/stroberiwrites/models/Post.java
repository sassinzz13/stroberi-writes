package fernlabs.com.stroberiwrites.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;

/*
MENTAL MODEL — the JPA entity (the database model)
==================================================
This class IS the `posts` table. Each instance of Post = one row.
JPA = "Java Persistence API". Hibernate is the most common JPA implementation,
and Spring Boot wires it up for you automatically (see application.properties).

DJANGO ANALOGUE: this entire class is the equivalent of:
    class Post(models.Model):
        title = models.CharField(max_length=255)
        slug = models.SlugField(unique=True)
        content = models.TextField()
        class Meta:
            db_table = "posts"

KEY ANNOTATIONS:
  @Entity              → "this class maps to a DB table" (required)
  @Table(name="posts") → override the default table name (would be "post" otherwise)
  @Id                  → marks the primary key field
  @GeneratedValue      → "let the DB auto-assign this value on insert"
  @Column              → fine-tune the column (nullable, unique, type, etc)

LIFECYCLE OF A POST OBJECT:
  1. `new Post()`              → "transient"  — exists only in Java memory, no DB row yet
  2. repository.save(post)     → "managed"    — DB row exists, JPA tracks changes
  3. inside @Transactional, mutating fields on a managed entity auto-syncs on commit
                                  (called "dirty checking")
  4. repository.delete(post)   → "removed"    — will be deleted at commit
  5. transaction ends / detach → "detached"   — Java object still exists but JPA no longer tracks it

WHY DOES THIS CLASS HAVE GETTERS/SETTERS BUT NO EXPLICIT CONSTRUCTOR?
JPA requires a no-argument constructor to instantiate entities when loading rows
from the DB. Java auto-provides one if you don't define any constructor —
so it's there implicitly.

WHY NO @NotBlank / @Size HERE?
Validation on the entity is for DB-level constraints (@Column(nullable=false) ≈
NOT NULL in SQL). Input validation (@NotBlank etc) lives on the DTO instead —
that way validation runs BEFORE we ever touch the database.
*/
@Entity // tell spring this is a database model
@Table(name = "posts") // specify the table name in the database
public class Post {
    
    // equivalent to djangos id = models.AutoField(primary_key=True)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-incrementing primary key
    private Long id;

    // equivalent to djangos title = models.CharField(max_length=255)
    @Column(nullable = false) // Title show in UI and in the URL, so it cannot be null
    private String title;

    // equivalent to djangos slug = models.SlugField(unique=True)
    @Column(unique = true, nullable = false) // Slug is used in the URL, so it must be unique and cannot be null
    private String slug;

    // equivalent to djangos content = models.TextField()
    @Column(columnDefinition = "TEXT") // Content can be long, so we use TEXT type in the database
    private String content;

    // foreign key
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    /*
    equivalent to djangos
    def get_title(self):
        return self.title
    */
    public String getTitle() {
        return title;
    }

    public String getSlug() {
        return slug;
    }

    public String getContent() {
        return content;
    }

    public Long getId() {
        return id;
    }

    public Category getCategory() {
    return category;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    /*
    equivalent to djangos
    def set_title(self, title):
        self.title = title
    */
    // we used a this so that java doesnt confuse the parameter title with the instance variable title
    public void setTitle(String title) {
        this.title = title;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCategory(Category category) {
    this.category = category;
    }
    
    // note no setID because the database will automatically generate the ID for us

    /*
    MENTAL MODEL
    post.setTitle("Hello"); means title = "Hello" and then
    post.getTitle() means give me title
    */

}
