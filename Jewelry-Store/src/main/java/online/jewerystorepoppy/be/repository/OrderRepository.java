package online.jewerystorepoppy.be.repository;

import online.jewerystorepoppy.be.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {
    List<Orders> findOrdersByCustomerPhoneContaining(String phone);

    @Query("SELECT o FROM Orders o WHERE o.createBy.id = :id AND FUNCTION('MONTH', o.createAt) = :month AND FUNCTION('YEAR', o.createAt) = :year")
    List<Orders> findOrdersByMonthAndYear(@Param("month") int month, @Param("year") int year, @Param("id") long accountId);

    @Query("SELECT o FROM Orders o WHERE  FUNCTION('MONTH', o.createAt) = :month AND FUNCTION('YEAR', o.createAt) = :year")
    List<Orders> findOrdersByMonthAndYear(@Param("month") int month, @Param("year") int year);
}
