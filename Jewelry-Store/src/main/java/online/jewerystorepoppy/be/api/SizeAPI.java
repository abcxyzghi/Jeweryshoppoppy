package online.jewerystorepoppy.be.api;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import online.jewerystorepoppy.be.model.MaterialRequest;
import online.jewerystorepoppy.be.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/size")
@SecurityRequirement(name = "api")
public class SizeAPI {
    @Autowired
    SizeService sizeService;

    @GetMapping
    public ResponseEntity get() {
        return ResponseEntity.ok(sizeService.get());
    }

    @GetMapping("{id}")
    public ResponseEntity get(@PathVariable long id) {
        return ResponseEntity.ok(sizeService.getById(id));
    }

    @PostMapping
    public ResponseEntity create(@RequestBody MaterialRequest materialRequest) {
        return ResponseEntity.ok(sizeService.create(materialRequest));
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable long id, @RequestBody MaterialRequest materialRequest) {
        return ResponseEntity.ok(sizeService.update(id, materialRequest));
    }

    @DeleteMapping("{id}")
    public ResponseEntity detele(@PathVariable long id) {
        return ResponseEntity.ok(sizeService.delete(id));
    }
}
