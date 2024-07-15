package online.jewerystorepoppy.be.service;

import online.jewerystorepoppy.be.entity.OrderBuy;
import online.jewerystorepoppy.be.entity.OrderDetail;
import online.jewerystorepoppy.be.model.OrderBuyRequest;
import online.jewerystorepoppy.be.repository.OrderBuyRepository;
import online.jewerystorepoppy.be.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderBuyService {

    @Autowired
    OrderDetailRepository orderDetailRepository;

    @Autowired
    OrderBuyRepository orderBuyRepository;

    public OrderBuy createOrderBuy(OrderBuyRequest orderBuyRequest) {
        OrderBuy orderBuy = new OrderBuy();

        orderBuy.setTotal(orderBuyRequest.getTotal());

        orderBuy.setOrderDetails(orderBuyRequest.getOrderDetailId().stream().map(id -> {
            OrderDetail orderDetail = orderDetailRepository.findById(id).get();
            orderDetail.setOrderBuy(orderBuy);
            orderDetail.getOrder().getCustomer().getOrderBuys().add(orderBuy);
            orderBuy.setCustomer(orderDetail.getOrder().getCustomer());
            return orderDetail;
        }).toList());

        return orderBuyRepository.save(orderBuy);
    }

    public List<OrderBuy> get() {
        return orderBuyRepository.findAll();
    }
}
