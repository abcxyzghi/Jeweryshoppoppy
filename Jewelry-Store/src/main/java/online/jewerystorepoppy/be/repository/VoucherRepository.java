package online.jewerystorepoppy.be.repository;

import online.jewerystorepoppy.be.entity.Product;
import online.jewerystorepoppy.be.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface VoucherRepository extends JpaRepository<Voucher, Long> {
    List<Voucher> findVouchersByIsDeletedFalse();
    List<Voucher> findVoucherByCode(String code);
    Voucher findVoucherById(long id);
}