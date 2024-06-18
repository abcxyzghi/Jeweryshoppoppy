package online.jewerystorepoppy.be.model;

import lombok.Data;

@Data
public class OrderDetailRequest {
    long productId;
    int quantity;
}
