package online.jewerystorepoppy.be.model;

import lombok.Data;

import java.util.ArrayList;
@Data
public class DashboardStaffResponse {
    String label;
    ArrayList<Integer> data = new ArrayList<>();
}
