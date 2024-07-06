package online.jewerystorepoppy.be.api;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import online.jewerystorepoppy.be.enums.ShiftStatus;
import online.jewerystorepoppy.be.model.ShiftRequest;
import online.jewerystorepoppy.be.service.ShiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/shift")
@SecurityRequirement(name = "api")
public class ShiftAPI {

    @Autowired
    ShiftService shiftService;

    @PostMapping
    public ResponseEntity createShift(@RequestBody ShiftRequest shiftRequest) {
        return ResponseEntity.ok(shiftService.create(shiftRequest));
    }

    @GetMapping()
    public ResponseEntity get(@RequestParam(required = false) long staffId, @RequestParam(required = false) String date) {
        return ResponseEntity.ok(shiftService.get(staffId, date));
    }

    @PostMapping("{id}")
    public ResponseEntity changStatus(@PathVariable long id, @RequestParam ShiftStatus status) {
        return ResponseEntity.ok(shiftService.changeStatus(id, status));
    }


}
