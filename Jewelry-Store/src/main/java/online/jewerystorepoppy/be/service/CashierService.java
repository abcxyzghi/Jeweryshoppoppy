package online.jewerystorepoppy.be.service;

import online.jewerystorepoppy.be.entity.Cashier;
import online.jewerystorepoppy.be.exception.BadRequestException;
import online.jewerystorepoppy.be.repository.CashierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CashierService {

    @Autowired
    CashierRepository cashierRepository;

    public List<Cashier> get() {
        return cashierRepository.findCashiersByIsDeletedFalse();
    }

    public Cashier create(Cashier cashier) {
        return cashierRepository.save(cashier);
    }

    public Cashier update(long id, Cashier cashier) {
        Cashier oldCashier = cashierRepository.findById(id).orElseThrow(() -> new BadRequestException("Cashier not found!"));
        oldCashier.setName(cashier.getName());
        return cashierRepository.save(cashier);
    }

    public Cashier delete(long id) {
        Cashier oldCashier = cashierRepository.findById(id).orElseThrow(() -> new BadRequestException("Cashier not found!"));
        oldCashier.setDeleted(true);
        return cashierRepository.save(oldCashier);
    }
}
