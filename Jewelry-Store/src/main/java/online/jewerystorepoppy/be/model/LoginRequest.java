package online.jewerystorepoppy.be.model;

import lombok.Data;

@Data
public class LoginRequest {
    String phone;
    String password;
}
