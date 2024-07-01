package online.jewerystorepoppy.be.api;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import online.jewerystorepoppy.be.entity.Cashier;
import online.jewerystorepoppy.be.service.CashierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/cashier")
@SecurityRequirement(name = "api")
public class CashierAPI {

    @Autowired
    CashierService cashierService;

    @GetMapping
    public ResponseEntity getCashiers() {
        return ResponseEntity.ok(cashierService.get());
    }

    @PostMapping
    public ResponseEntity create(@RequestBody Cashier cashier) {
        return ResponseEntity.ok(cashierService.create(cashier));
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable long id, @RequestBody Cashier cashier) {
        return ResponseEntity.ok(cashierService.update(id, cashier));
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable long id) {
        return ResponseEntity.ok(cashierService.delete(id));
    }
}
