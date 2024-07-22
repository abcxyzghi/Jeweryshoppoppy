package online.jewerystorepoppy.be.api;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import online.jewerystorepoppy.be.entity.OrderBuy;
import online.jewerystorepoppy.be.model.OrderBuyRequest;
import online.jewerystorepoppy.be.repository.OrderBuyRepository;
import online.jewerystorepoppy.be.service.OrderBuyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/order-buy")
@SecurityRequirement(name = "api")
public class OrderBuyAPI {

    @Autowired
    OrderBuyService orderBuyService;

    @PostMapping()
    public ResponseEntity create(@RequestBody OrderBuyRequest orderBuyRequest) {
        return ResponseEntity.ok(orderBuyService.createOrderBuy(orderBuyRequest));
    }

    @GetMapping
    public ResponseEntity get() {
        return ResponseEntity.ok(orderBuyService.get());
    }

}
