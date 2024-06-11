package online.jewerystorepoppy.be.service;

import online.jewerystorepoppy.be.entity.Certificate;
import online.jewerystorepoppy.be.entity.Material;
import online.jewerystorepoppy.be.model.MaterialRequest;
import online.jewerystorepoppy.be.repository.CertificateRepository;
import online.jewerystorepoppy.be.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MaterialService {

    @Autowired
    MaterialRepository materialRepository;

    @Autowired
    CertificateRepository certificateRepository;


    public List<Material> get() {
        return materialRepository.findMaterialsByIsDeletedFalse();
    }

    public Material getById(long id) {
        return materialRepository.findById(id).get();
    }

    public Material delete(long id) {
        Material material = getById(id);
        material.setDeleted(true);
        return materialRepository.save(material);
    }

    public Material update(long id, MaterialRequest materialRequest) {
        Material material = getById(id);
        if (materialRequest.getCertificateId() != 0) {
            Certificate certificate = certificateRepository.findById(materialRequest.getCertificateId()).get();
            List<Certificate> certificates = new ArrayList<>();
            if (material.getCertificates() != null) {
                certificates = material.getCertificates();
            }

            material.setCertificates(certificates);
        }
        material.setName(materialRequest.getName());
        material.setDescription(materialRequest.getDescription());
        material.setDiamondOrigin(materialRequest.getDiamondOrigin());
        return materialRepository.save(material);
    }

    public Material create(MaterialRequest materialRequest) {
        Material material = new Material();
        if (materialRequest.getCertificateId() != 0) {
            Certificate certificate = certificateRepository.findById(materialRequest.getCertificateId()).get();
            List<Certificate> certificates = new ArrayList<>();
            if (material.getCertificates() != null) {
                certificates = material.getCertificates();
            }

            material.setCertificates(certificates);
        }
        material.setName(materialRequest.getName());
        material.setDescription(materialRequest.getDescription());
        material.setDiamondOrigin(materialRequest.getDiamondOrigin());
        material.setCreateAt(new Date());
        return materialRepository.save(material);
    }
}
