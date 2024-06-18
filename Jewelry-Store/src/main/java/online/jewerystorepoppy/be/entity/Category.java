package online.jewerystorepoppy.be.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String name;
    String description;

    @JsonIgnore
    boolean isDeleted = false;


    @JsonIgnore
    @OneToMany(mappedBy = "category")
    List<Product> products;
}
