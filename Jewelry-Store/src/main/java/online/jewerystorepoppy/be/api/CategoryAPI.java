package online.jewerystorepoppy.be.api;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import online.jewerystorepoppy.be.entity.Category;
import online.jewerystorepoppy.be.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/category")
@SecurityRequirement(name = "api")
public class CategoryAPI {

    @Autowired
    CategoryService categoryService;

    @GetMapping
    public ResponseEntity get(@RequestParam(required = false) String keyWord) {
        return ResponseEntity.ok(categoryService.get(keyWord));
    }

    @GetMapping("{id}")
    public ResponseEntity get(@PathVariable long id) {
        return ResponseEntity.ok(categoryService.getById(id));
    }

    @PostMapping
    public ResponseEntity create(@RequestBody Category category) {
        return ResponseEntity.ok(categoryService.create(category));
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable long id, @RequestBody Category category) {
        return ResponseEntity.ok(categoryService.update(id, category));
    }

    @DeleteMapping("{id}")
    public ResponseEntity detele(@PathVariable long id) {
        return ResponseEntity.ok(categoryService.delete(id));
    }
}
