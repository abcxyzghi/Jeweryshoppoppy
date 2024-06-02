package com.example.demo.entity;

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
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String name;
    String description;
    String diamondOrigin;
    Date createAt;

    @OneToMany(mappedBy = "material")
    List<Certificate> certificates;

    @ManyToMany
    @JoinTable(
            name = "product_material",
            joinColumns = @JoinColumn(name = "material_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    List<Product> products;
}
