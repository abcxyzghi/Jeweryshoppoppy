package online.jewerystorepoppy.be.api;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import online.jewerystorepoppy.be.entity.Orders;
import online.jewerystorepoppy.be.model.OrderRequest;
import online.jewerystorepoppy.be.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/order")
@SecurityRequirement(name = "api")
public class OrderAPI {

    @Autowired
    OrderService orderService;

    @PostMapping
    public ResponseEntity createOrder(@RequestBody OrderRequest orderRequest) {
        Orders orders = orderService.createOrder(orderRequest);
        return ResponseEntity.ok(orders);
    }

    @GetMapping
    public ResponseEntity getOrder(){
        List<Orders> orders = orderService.getOrder();
        return ResponseEntity.ok(orders);
    }
}
