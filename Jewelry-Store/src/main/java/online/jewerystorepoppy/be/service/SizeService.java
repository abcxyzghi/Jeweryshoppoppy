package online.jewerystorepoppy.be.service;

import online.jewerystorepoppy.be.entity.Size;
import online.jewerystorepoppy.be.model.MaterialRequest;
import online.jewerystorepoppy.be.repository.SizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeService {

    @Autowired
    SizeRepository sizeRepository;


    public List<Size> get() {
        return sizeRepository.findSizesByIsDeletedFalse();
    }

    public Size getById(long id) {
        return sizeRepository.findById(id).get();
    }

    public Size delete(long id) {
        Size material = getById(id);
        material.setDeleted(true);
        return sizeRepository.save(material);
    }

    public Size update(long id, MaterialRequest materialRequest) {
        Size material = getById(id);
        material.setName(materialRequest.getName());
        material.setDescription(materialRequest.getDescription());
        return sizeRepository.save(material);
    }

    public Size create(MaterialRequest materialRequest) {
        Size size = new Size();
        size.setName(materialRequest.getName());
        size.setDescription(materialRequest.getDescription());
        return sizeRepository.save(size);
    }
}
