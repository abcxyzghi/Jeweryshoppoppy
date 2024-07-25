package online.jewerystorepoppy.be.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class OrderBuy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    float total;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    Account customer;

    @OneToMany(mappedBy = "orderBuy")
    List<OrderDetail> orderDetails;
}
