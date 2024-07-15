package online.jewerystorepoppy.be.repository;

import online.jewerystorepoppy.be.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
}
