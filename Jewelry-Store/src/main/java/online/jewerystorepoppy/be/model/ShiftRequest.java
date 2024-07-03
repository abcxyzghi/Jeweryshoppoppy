package online.jewerystorepoppy.be.model;

import lombok.Data;
import online.jewerystorepoppy.be.enums.ShiftStatus;

import java.util.Date;

@Data
public class ShiftRequest {
    long staffId;
    long cashierId;
    Date from;
    Date to;
    ShiftStatus status;
}
