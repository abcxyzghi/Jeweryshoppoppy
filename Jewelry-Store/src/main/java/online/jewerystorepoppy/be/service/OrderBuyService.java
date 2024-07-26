package online.jewerystorepoppy.be.service;

import online.jewerystorepoppy.be.entity.OrderBuy;
import online.jewerystorepoppy.be.entity.OrderDetail;
import online.jewerystorepoppy.be.entity.Product;
import online.jewerystorepoppy.be.model.OrderBuyRequest;
import online.jewerystorepoppy.be.repository.OrderBuyRepository;
import online.jewerystorepoppy.be.repository.OrderDetailRepository;
import online.jewerystorepoppy.be.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderBuyService {

    @Autowired
    OrderDetailRepository orderDetailRepository;

    @Autowired
    OrderBuyRepository orderBuyRepository;

    @Autowired
    ProductRepository productRepository;

    public OrderBuy createOrderBuy(OrderBuyRequest orderBuyRequest) {
        OrderBuy orderBuy = new OrderBuy();

        orderBuy.setTotal(orderBuyRequest.getTotal());

        orderBuy.setOrderDetails(orderBuyRequest.getOrderDetailId().stream().map(id -> {
            OrderDetail orderDetail = orderDetailRepository.findById(id).get();
            Product product = orderDetail.getProduct();
            product.setQuantity(product.getQuantity() + 1);
            productRepository.save(product);
            orderDetail.setOrderBuy(orderBuy);
            orderDetail.getOrder().getCustomer().getOrderBuys().add(orderBuy);
            orderDetail.setBuyBack(true);
            orderBuy.setCustomer(orderDetail.getOrder().getCustomer());
            return orderDetail;
        }).toList());

        return orderBuyRepository.save(orderBuy);
    }

    public List<OrderBuy> get() {
        return orderBuyRepository.findAll();
    }
}
