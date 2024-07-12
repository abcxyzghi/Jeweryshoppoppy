package online.jewerystorepoppy.be.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String name;
    String description;
    boolean isDeleted;

    @ManyToMany
    @JoinTable(
            name = "product_size",
            joinColumns = @JoinColumn(name = "size_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    @JsonIgnore
    List<Product> products = new ArrayList<>();
}
