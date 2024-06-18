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
public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String number;
    String url;
    Date expiredDate;
    Date startAt;
    boolean isDeleted = false;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "material_id")
    Material material;
}
