package online.jewerystorepoppy.be.repository;

import online.jewerystorepoppy.be.entity.Cashier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CashierRepository extends JpaRepository<Cashier, Long> {

    List<Cashier> findCashiersByIsDeletedFalse();
}
