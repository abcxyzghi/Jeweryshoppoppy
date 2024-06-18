package online.jewerystorepoppy.be.model;

import lombok.Data;

@Data
public class ProductResponse {
    long id;
    String name;
    String description;
    float price;
    long categoryId;
}
