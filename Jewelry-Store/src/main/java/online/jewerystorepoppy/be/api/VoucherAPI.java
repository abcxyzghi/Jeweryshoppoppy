package online.jewerystorepoppy.be.api;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import online.jewerystorepoppy.be.entity.Product;
import online.jewerystorepoppy.be.entity.Voucher;
import online.jewerystorepoppy.be.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/voucher")
@SecurityRequirement(name = "api")
public class VoucherAPI {

    @Autowired
    VoucherService voucherService;

    @GetMapping
    public ResponseEntity get(@RequestParam(required = false) String code) {
        return ResponseEntity.ok(voucherService.get(code));
    }

    @GetMapping("{id}")
    public ResponseEntity get(@PathVariable long id) {
        return ResponseEntity.ok(voucherService.getById(id));
    }

    @PostMapping
    public ResponseEntity create(@RequestBody Voucher voucher) {
        return ResponseEntity.ok(voucherService.create(voucher));
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable long id, @RequestBody Voucher voucher) {
        return ResponseEntity.ok(voucherService.update(id, voucher));
    }

    @DeleteMapping("{id}")
    public ResponseEntity detele(@PathVariable long id) {
        return ResponseEntity.ok(voucherService.delete(id));
    }
}
