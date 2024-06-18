package online.jewerystorepoppy.be.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class Shift {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    Account staff;

    @ManyToOne
    @JoinColumn(name = "cashier_id")
    Cashier cashier;

    @OneToMany(mappedBy = "shift")
    List<Orders> orders;
}
