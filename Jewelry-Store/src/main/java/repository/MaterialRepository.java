package online.jewerystorepoppy.be.repository;

import online.jewerystorepoppy.be.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, Long> {
    List<Material> findMaterialsByIsDeletedFalse();
}
