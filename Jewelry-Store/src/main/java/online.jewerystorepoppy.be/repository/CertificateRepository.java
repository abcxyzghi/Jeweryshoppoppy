package online.jewerystorepoppy.be.repository;

import online.jewerystorepoppy.be.entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    List<Certificate> findCertificatesByIsDeletedFalse();
}
