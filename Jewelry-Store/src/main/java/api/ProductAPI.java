package online.jewerystorepoppy.be.api;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import online.jewerystorepoppy.be.entity.Category;
import online.jewerystorepoppy.be.entity.Product;
import online.jewerystorepoppy.be.model.ProductRequest;
import online.jewerystorepoppy.be.service.CategoryService;
import online.jewerystorepoppy.be.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/product")
@SecurityRequirement(name = "api")
public class ProductAPI {

    @Autowired
    ProductService productService;

    @GetMapping
    public ResponseEntity get() {
        return ResponseEntity.ok(productService.get());
    }

    @GetMapping("{id}")
    public ResponseEntity get(@PathVariable long id) {
        return ResponseEntity.ok(productService.getById(id));
    }

    @PostMapping
    public ResponseEntity create(@RequestBody ProductRequest productRequest) {
        return ResponseEntity.ok(productService.create(productRequest));
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable long id, @RequestBody ProductRequest productRequest) {
        return ResponseEntity.ok(productService.update(id, productRequest));
    }

    @DeleteMapping("{id}")
    public ResponseEntity detele(@PathVariable long id) {
        return ResponseEntity.ok(productService.delete(id));
    }
}
