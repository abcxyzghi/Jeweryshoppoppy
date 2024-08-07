package online.jewerystorepoppy.be.repository;

import online.jewerystorepoppy.be.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findCategoriesByIsDeletedFalse();
    List<Category> findCategoriesByIsDeletedFalseAndNameContaining(String keyWord);
}
