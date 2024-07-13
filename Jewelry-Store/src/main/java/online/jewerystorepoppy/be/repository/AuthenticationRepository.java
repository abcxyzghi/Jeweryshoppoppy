package online.jewerystorepoppy.be.repository;

import online.jewerystorepoppy.be.entity.Account;
import online.jewerystorepoppy.be.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthenticationRepository extends JpaRepository<Account, Long> {

    Account findAccountByPhone(String phone);

    Account findAccountByEmail(String email);
    Account findAccountById(long id);

    Account findAccountByEmailOrPhone(String email, String phone);

    List<Account> findAccountByEmailContainingOrPhoneContainingOrFullNameContaining(String email, String phone, String fullName);

    List<Account> findAccountByRole(Role role);
}
