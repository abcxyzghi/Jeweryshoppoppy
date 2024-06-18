package online.jewerystorepoppy.be.service;

import online.jewerystorepoppy.be.entity.Account;
import online.jewerystorepoppy.be.entity.OrderDetail;
import online.jewerystorepoppy.be.entity.Orders;
import online.jewerystorepoppy.be.entity.Product;
import online.jewerystorepoppy.be.enums.OrderStatus;
import online.jewerystorepoppy.be.model.OrderDetailRequest;
import online.jewerystorepoppy.be.model.OrderRequest;
import online.jewerystorepoppy.be.repository.AuthenticationRepository;
import online.jewerystorepoppy.be.repository.OrderRepository;
import online.jewerystorepoppy.be.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    AuthenticationRepository authenticationRepository;

    public Orders createOrder(OrderRequest orderRequest) {
        Orders order = new Orders();
        long totalAmount = 0;
        List<OrderDetail> orderDetails = new ArrayList<>();
        Account account = authenticationRepository.findAccountByEmailOrPhone(authenticationService.getCurrentAccount().getEmail(), authenticationService.getCurrentAccount().getPhone());
        order.setCreateAt(new Date());
        order.setCreateBy(account);
        order.setStatus(OrderStatus.DONE);
        order.setOrderDetails(orderDetails);


        for (OrderDetailRequest orderDetailRequest : orderRequest.getOrderDetailRequests()) {
            OrderDetail orderDetail = new OrderDetail();
            Product product = productRepository.findById(orderDetailRequest.getProductId()).get();
            orderDetail.setProduct(product);
            orderDetail.setQuantity(orderDetail.getQuantity());
            orderDetail.setOrder(order);
            orderDetails.add(orderDetail);
            totalAmount += product.getPrice() * orderDetailRequest.getQuantity();
        }
        order.setTotalAmount(totalAmount);
        return orderRepository.save(order);
    }

    public List<Orders> getOrder(){
        return orderRepository.findAll();
    }
}
