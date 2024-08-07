package online.jewerystorepoppy.be.repository;

import online.jewerystorepoppy.be.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findProductsByIsDeletedFalse();
    List<Product> findProductsByCategoryId(long id);
    List<Product> findProductsByCategoryIdAndCategoryNameContaining(long id, String keyWord);
}
