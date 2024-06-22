package online.jewerystorepoppy.be.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import online.jewerystorepoppy.be.enums.GuaranteeStatus;

import java.util.Date;

@Entity
@Getter
@Setter
public class Guarantee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    Date startAt;
    Date endAt;
    GuaranteeStatus status;

    @OneToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    OrderDetail orderDetail;
}
