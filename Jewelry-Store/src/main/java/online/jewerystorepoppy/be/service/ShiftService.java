package online.jewerystorepoppy.be.service;

import online.jewerystorepoppy.be.entity.Account;
import online.jewerystorepoppy.be.entity.Shift;
import online.jewerystorepoppy.be.enums.ShiftStatus;
import online.jewerystorepoppy.be.model.ShiftRequest;
import online.jewerystorepoppy.be.repository.AuthenticationRepository;
import online.jewerystorepoppy.be.repository.CashierRepository;
import online.jewerystorepoppy.be.repository.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class ShiftService {

    @Autowired
    AuthenticationRepository authenticationRepository;

    @Autowired
    CashierRepository cashierRepository;

    @Autowired
    ShiftRepository shiftRepository;

    public Shift create(ShiftRequest shiftRequest) {
        Account account = authenticationRepository.findAccountById(shiftRequest.getStaffId());
        Shift shift = new Shift();
        shift.setFromTime(shiftRequest.getFrom());
        shift.setToTime(shiftRequest.getTo());
        shift.setStaff(account);
        shift.setStatus(shiftRequest.getStatus());
        return shiftRepository.save(shift);
    }

    public List<Shift> get(long staffId, String date) {
        if (staffId != 0) {
            return shiftRepository.findShiftsByStaffId(staffId);
        }

        if (date != null) {
            Date date2 = new Date(date);
            return getShiftByDate(date2);
        }

        return shiftRepository.findAll();
    }

    public List<Shift> getShiftByDate(Date date) {
        Date from = setTimeToHour(date, 0);
        Date to = setTimeToHour(date, 23);
        return shiftRepository.findShiftsByFromTimeBetween(from, to);
    }

    public Shift changeStatus(long id, ShiftStatus status) {
        Shift shift = shiftRepository.findById(id).get();
        shift.setStatus(status);
        return shiftRepository.save(shift);
    }

    public static Date setTimeToHour(Date date, int hour) {
        // Create a Calendar object and set the time to the date
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        // Set hour, minute, second, and millisecond to the specified values
        calendar.set(Calendar.HOUR_OF_DAY, hour);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        // Return the updated Date object
        return calendar.getTime();
    }
}
