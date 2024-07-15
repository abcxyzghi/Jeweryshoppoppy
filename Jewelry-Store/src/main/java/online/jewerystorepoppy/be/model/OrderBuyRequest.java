package online.jewerystorepoppy.be.model;

import lombok.Data;

import java.util.List;

@Data
public class OrderBuyRequest {
    float total;
    List<Long> orderDetailId;
}
