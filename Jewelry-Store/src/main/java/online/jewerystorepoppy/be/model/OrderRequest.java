package online.jewerystorepoppy.be.model;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    List<OrderDetailRequest> orderDetailRequests;
    long customerId;
    long voucherId;
    int point = 0;
}
