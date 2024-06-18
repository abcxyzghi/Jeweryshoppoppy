package online.jewerystorepoppy.be.api;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import online.jewerystorepoppy.be.model.MaterialRequest;
import online.jewerystorepoppy.be.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/material")
@SecurityRequirement(name = "api")
public class MaterialAPI {

    @Autowired
    MaterialService materialService;

    @GetMapping
    public ResponseEntity get() {
        return ResponseEntity.ok(materialService.get());
    }

    @GetMapping("{id}")
    public ResponseEntity get(@PathVariable long id) {
        return ResponseEntity.ok(materialService.getById(id));
    }

    @PostMapping
    public ResponseEntity create(@RequestBody MaterialRequest materialRequest) {
        return ResponseEntity.ok(materialService.create(materialRequest));
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable long id, @RequestBody MaterialRequest materialRequest) {
        return ResponseEntity.ok(materialService.update(id, materialRequest));
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable long id) {
        return ResponseEntity.ok(materialService.delete(id));
    }
}
