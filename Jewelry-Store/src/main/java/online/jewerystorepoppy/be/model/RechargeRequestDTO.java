package online.jewerystorepoppy.be.model;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RechargeRequestDTO {
    String amount;
    OrderRequest orderRequest;
}
