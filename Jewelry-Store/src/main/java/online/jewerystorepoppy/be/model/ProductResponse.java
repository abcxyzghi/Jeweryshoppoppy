package online.jewerystorepoppy.be.model;

import lombok.Data;
import online.jewerystorepoppy.be.entity.Size;
import java.util.List;

@Data
public class ProductResponse {
    long id;
    String name;
    String description;
    float price;
    long categoryId;
    String code;
    int quantity;
    List<Long> materialIds;
    List<Long> sizeIds;
    String image;
    List<Size> sizes;
}
