package online.jewerystorepoppy.be.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    int quantity;
    boolean isBuyBack = false;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    Orders order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    Product product;

    @ManyToOne
    @JoinColumn(name = "size_id")
    Size size;

    @OneToOne(mappedBy = "orderDetail", cascade = CascadeType.ALL)
    Guarantee guarantee;

    @ManyToOne()
    @JoinColumn(name = "order_buy_id")
    @JsonIgnore
    OrderBuy orderBuy;
}
