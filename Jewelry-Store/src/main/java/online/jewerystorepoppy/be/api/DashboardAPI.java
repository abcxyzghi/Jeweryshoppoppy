package online.jewerystorepoppy.be.api;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import online.jewerystorepoppy.be.entity.Account;
import online.jewerystorepoppy.be.entity.Orders;
import online.jewerystorepoppy.be.model.DashboardStaffResponse;
import online.jewerystorepoppy.be.repository.OrderRepository;
import online.jewerystorepoppy.be.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/dashboard")
@SecurityRequirement(name = "api")
public class DashboardAPI {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    AuthenticationService authenticationService;

    @GetMapping("staff")
    public ResponseEntity getStaff() {
        // Define the date format
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Account account = authenticationService.getCurrentAccount();

        // Get today's date
        LocalDate today = LocalDate.now();

        // Calculate the start and end dates for past and future periods
        LocalDate startPast = today.minusMonths(3);
        LocalDate endPast = today.minusDays(1); // Up to yesterday

        LocalDate startFuture = today.plusDays(1); // Starting from tomorrow
        LocalDate endFuture = today.plusMonths(3);


        DashboardStaffResponse totalData = new DashboardStaffResponse();
        totalData.setLabel("Money");

        DashboardStaffResponse orderData = new DashboardStaffResponse();
        orderData.setLabel("Order");

        // Loop through the past 3 months
        System.out.println("Months in the past 3 months:");
        for (LocalDate date = startPast; !date.isAfter(endPast); date = date.plusMonths(1)) {
            List<Orders> orders = orderRepository.findOrdersByMonthAndYear(date.getMonthValue(), 2024, account.getId());
            System.out.println(orders.size());
            orderData.getData().add(orders.size());
            totalData.getData().add((int) orders.stream()
                    .mapToDouble(Orders::getTotalAmount)
                    .sum());
        }

        // Loop through the next 3 months
        System.out.println("\nMonths in the next 3 months:");
        for (LocalDate date = startFuture; !date.isAfter(endFuture); date = date.plusMonths(1)) {
            List<Orders> orders = orderRepository.findOrdersByMonthAndYear(date.getMonthValue(), 2024, account.getId());
            System.out.println(orders.size());
            orderData.getData().add(orders.size());
            totalData.getData().add((int) orders.stream()
                    .mapToDouble(Orders::getTotalAmount)
                    .sum());
        }

        ArrayList<DashboardStaffResponse> list = new ArrayList<>();
        list.add(orderData);
        list.add(totalData);

        return ResponseEntity.ok(list);
    }

    @GetMapping("admin")
    public ResponseEntity getAdmin() {
        // Define the date format
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Account account = authenticationService.getCurrentAccount();

        // Get today's date
        LocalDate today = LocalDate.now();

        // Calculate the start and end dates for past and future periods
        LocalDate startPast = today.minusMonths(3);
        LocalDate endPast = today.minusDays(1); // Up to yesterday

        LocalDate startFuture = today.plusDays(1); // Starting from tomorrow
        LocalDate endFuture = today.plusMonths(3);


        DashboardStaffResponse totalData = new DashboardStaffResponse();
        totalData.setLabel("Money");

        DashboardStaffResponse orderData = new DashboardStaffResponse();
        orderData.setLabel("Order");

        // Loop through the past 3 months
        System.out.println("Months in the past 3 months:");
        for (LocalDate date = startPast; !date.isAfter(endPast); date = date.plusMonths(1)) {
            List<Orders> orders = orderRepository.findOrdersByMonthAndYear(date.getMonthValue(), 2024);
            System.out.println(orders.size());
            orderData.getData().add(orders.size());
            totalData.getData().add((int) orders.stream()
                    .mapToDouble(Orders::getTotalAmount)
                    .sum());
        }

        // Loop through the next 3 months
        System.out.println("\nMonths in the next 3 months:");
        for (LocalDate date = startFuture; !date.isAfter(endFuture); date = date.plusMonths(1)) {
            List<Orders> orders = orderRepository.findOrdersByMonthAndYear(date.getMonthValue(), 2024);
            System.out.println(orders.size());
            orderData.getData().add(orders.size());
            totalData.getData().add((int) orders.stream()
                    .mapToDouble(Orders::getTotalAmount)
                    .sum());
        }

        ArrayList<DashboardStaffResponse> list = new ArrayList<>();
        list.add(orderData);
        list.add(totalData);

        return ResponseEntity.ok(list);
    }
}
