package online.jewerystorepoppy.be.repository;

import online.jewerystorepoppy.be.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {
    List<Voucher> findVouchersByIsDeletedFalse();
}
