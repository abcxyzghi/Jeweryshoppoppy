package online.jewerystorepoppy.be.repository;

import online.jewerystorepoppy.be.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Orders, Long> {
}
