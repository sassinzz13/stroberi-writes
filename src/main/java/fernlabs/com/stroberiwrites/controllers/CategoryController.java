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

import fernlabs.com.stroberiwrites.dto.CategoryRequestDTO;
import fernlabs.com.stroberiwrites.dto.CategoryResponseDTO;
import fernlabs.com.stroberiwrites.service.CategoryService;

@RestController
@RequestMapping("/blog/categories")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public CategoryResponseDTO getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @GetMapping("/by-slug/{slug}")
    public CategoryResponseDTO getCategoryBySlug(@PathVariable String slug) {
        return categoryService.getCategoryBySlug(slug);
    }

    @PostMapping
    public CategoryResponseDTO createCategory(@Valid @RequestBody CategoryRequestDTO categoryRequestDTO) {
        return categoryService.createCategory(categoryRequestDTO);
    }

    @PutMapping("/{id}")
    public CategoryResponseDTO updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryRequestDTO categoryRequestDTO
    ) {
        return categoryService.updateCategory(id, categoryRequestDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }
}
