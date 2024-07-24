package online.jewerystorepoppy.be.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ProductRequest {
    String name;
    String description;
    float price;
    long categoryId;
    int quantity;
    String code;
    String image;
    List<Long> materialIds = new ArrayList<>();
    List<Long> sizeIds;
}
