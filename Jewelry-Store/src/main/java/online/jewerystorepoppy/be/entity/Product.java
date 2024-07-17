package online.jewerystorepoppy.be.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
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
    String code;
    int quantity;
    String image;
    boolean isDeleted = false;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "category_id")
    Category category;

    @JsonIgnore
    @ManyToMany(mappedBy = "products")
    List<Material> materials;

    @JsonIgnore
    @OneToMany(mappedBy = "product")
    List<OrderDetail> orderDetails;

    @ManyToMany(mappedBy = "products")
    List<Size> sizes = new ArrayList<>();
}
