package online.jewerystorepoppy.be.service;

import online.jewerystorepoppy.be.entity.Certificate;
import online.jewerystorepoppy.be.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificateService {

    @Autowired
    CertificateRepository certificateRepository;

    public Certificate create(Certificate category) {
        return certificateRepository.save(category);
    }

    public List<Certificate> get() {
        return certificateRepository.findCertificatesByIsDeletedFalse();
    }

    public Certificate getById(long id) {
        return certificateRepository.findById(id).get();
    }

    public Certificate delete(long id) {
        Certificate category = getById(id);
        category.setDeleted(true);
        return certificateRepository.save(category);
    }

    public Certificate update(long id, Certificate certificate) {
        Certificate category = getById(id);
        category.setNumber(certificate.getNumber());
        category.setUrl(certificate.getUrl());
        category.setStartAt(certificate.getStartAt());
        category.setExpiredDate(certificate.getExpiredDate());
        return certificateRepository.save(category);
    }
}
