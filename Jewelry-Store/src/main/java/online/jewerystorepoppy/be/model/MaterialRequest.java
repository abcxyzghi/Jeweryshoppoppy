package online.jewerystorepoppy.be.model;

import lombok.Data;

import java.util.Date;

@Data
public class MaterialRequest {
    String name;
    String description;
    String diamondOrigin;
    long certificateId;
}