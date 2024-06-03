package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Getter
@Setter
@ToString
public class Voucher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String code;
    Date startAt;
    Date endAt;
    Date createAt;

    @ManyToOne()
    @JoinColumn(name = "manager_id")
    Account createBy;

    @ManyToOne
    @JoinColumn(name = "order_id")
    Orders order;
}
