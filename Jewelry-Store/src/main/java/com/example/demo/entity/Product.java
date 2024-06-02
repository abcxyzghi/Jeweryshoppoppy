package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String name;
    String description;
    float price;

    @ManyToOne
    @JoinColumn(name = "category_id")
    Category category;

    @ManyToMany(mappedBy = "products")
    List<Material> materials;

    @OneToMany(mappedBy = "product")
    List<OrderDetail> orderDetails;

}
