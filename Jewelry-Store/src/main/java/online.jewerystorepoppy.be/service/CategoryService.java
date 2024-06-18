package online.jewerystorepoppy.be.service;

import online.jewerystorepoppy.be.entity.Category;
import online.jewerystorepoppy.be.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public Category create(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> get() {
        return categoryRepository.findCategoriesByIsDeletedFalse();
    }

    public Category getById(long id) {
        return categoryRepository.findById(id).get();
    }

    public Category delete(long id) {
        Category category = getById(id);
        category.setDeleted(true);
        return categoryRepository.save(category);
    }

    public Category update(long id, Category categoryRequest) {
        Category category = getById(id);
        category.setName(categoryRequest.getName());
        category.setDescription(categoryRequest.getDescription());
        return categoryRepository.save(category);
    }
}
