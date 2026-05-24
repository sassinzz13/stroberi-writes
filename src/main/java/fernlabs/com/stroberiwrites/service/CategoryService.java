package fernlabs.com.stroberiwrites.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fernlabs.com.stroberiwrites.dto.CategoryRequestDTO;
import fernlabs.com.stroberiwrites.dto.CategoryResponseDTO;
import fernlabs.com.stroberiwrites.exceptions.CategoryNotFoundException;
import fernlabs.com.stroberiwrites.exceptions.DuplicateSlugException;
import fernlabs.com.stroberiwrites.models.Category;
import fernlabs.com.stroberiwrites.repository.CategoryRepository;

@Service
@Transactional(readOnly = true)
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public CategoryResponseDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        return convertToDTO(category);
    }

    public CategoryResponseDTO getCategoryBySlug(String slug) {
        Category category = categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        return convertToDTO(category);
    }

    @Transactional
    public CategoryResponseDTO createCategory(CategoryRequestDTO request) {
        throwIfSlugExists(request.slug());

        Category category = new Category();

        category.setName(request.name());
        category.setSlug(request.slug());

        Category savedCategory = categoryRepository.save(category);

        return convertToDTO(savedCategory);
    }

    @Transactional
    public CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO request) {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        throwIfSlugBelongsToAnotherCategory(request.slug(), id);

        existingCategory.setName(request.name());
        existingCategory.setSlug(request.slug());

        Category savedCategory = categoryRepository.save(existingCategory);

        return convertToDTO(savedCategory);
    }

    @Transactional
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        categoryRepository.delete(category);
    }

    private CategoryResponseDTO convertToDTO(Category category) {
        return new CategoryResponseDTO(
                category.getId(),
                category.getName(),
                category.getSlug(),
                category.getCreatedAt(),
                category.getUpdatedAt()
        );
    }

    private void throwIfSlugExists(String slug) {
        categoryRepository.findBySlug(slug)
                .ifPresent(category -> {
                    throw new DuplicateSlugException("Category slug already exists");
                });
    }

    private void throwIfSlugBelongsToAnotherCategory(String slug, Long categoryId) {
        categoryRepository.findBySlug(slug)
                .filter(category -> !category.getId().equals(categoryId))
                .ifPresent(category -> {
                    throw new DuplicateSlugException("Category slug already exists");
                });
    }
}
