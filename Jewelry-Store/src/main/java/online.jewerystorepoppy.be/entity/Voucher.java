package online.jewerystorepoppy.be.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Getter
@Setter
@ToString
public class Voucher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String code;
    Date startAt;
    Date endAt;
    Date createAt;

    @JsonIgnore
    boolean isDeleted = false;


    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "manager_id")
    Account createBy;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "order_id")
    Orders order;
}
