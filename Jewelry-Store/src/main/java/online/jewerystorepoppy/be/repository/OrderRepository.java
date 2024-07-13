package online.jewerystorepoppy.be.repository;

import online.jewerystorepoppy.be.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {
    List<Orders> findOrdersByCustomerPhoneContaining(String phone);
}
