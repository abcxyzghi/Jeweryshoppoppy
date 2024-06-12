package online.jewerystorepoppy.be.model;

import lombok.Data;

@Data
public class ProductRequest {
    String name;
    String description;
    float price;
    long categoryId;
}
