package online.jewerystorepoppy.be.service;

import online.jewerystorepoppy.be.entity.Voucher;
import online.jewerystorepoppy.be.entity.Voucher;
import online.jewerystorepoppy.be.repository.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class VoucherService {

    @Autowired
    VoucherRepository voucherRepository;

    public Voucher create(Voucher Voucher) {
        Voucher.setCreateAt(new Date());
        return voucherRepository.save(Voucher);
    }

    public List<Voucher> get(String code) {
        if (code != null) {
            return voucherRepository.findVoucherByCode(code);
        }
        return voucherRepository.findVouchersByIsDeletedFalse();
    }

    public Voucher getById(long id) {
        return voucherRepository.findById(id).get();
    }

    public Voucher delete(long id) {
        Voucher voucher = getById(id);
        voucher.setDeleted(true);
        return voucherRepository.save(voucher);
    }

    public Voucher update(long id, Voucher voucherRequest) {
        Voucher voucher = getById(id);
        voucher.setCode(voucherRequest.getCode());
        voucher.setCreateAt(new Date());
        voucher.setStartAt(voucherRequest.getStartAt());
        voucher.setEndAt(voucherRequest.getEndAt());
        voucher.setValue(voucherRequest.getValue());
        return voucherRepository.save(voucher);
    }
}
