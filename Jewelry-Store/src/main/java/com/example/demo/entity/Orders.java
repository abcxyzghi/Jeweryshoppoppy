package com.example.demo.entity;

import com.example.demo.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    Date createAt;
    float totalAmount;
    OrderStatus status;
    String description;

    @ManyToOne
    @JoinColumn(name = "account_id")
    Account createBy;

    @OneToMany(mappedBy = "order")
    List<Voucher> vouchers;

    @ManyToOne()
    @JoinColumn(name = "shift_id")
    Shift shift;

    @OneToMany(mappedBy = "order")
    List<OrderDetail> orderDetails;
}
