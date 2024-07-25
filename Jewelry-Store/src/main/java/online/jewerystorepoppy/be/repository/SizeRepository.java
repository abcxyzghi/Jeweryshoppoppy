package online.jewerystorepoppy.be.repository;

import online.jewerystorepoppy.be.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SizeRepository extends JpaRepository<Size, Long> {
    List<Size> findSizesByIsDeletedFalse();

    Size findSizeById(long id);
}
