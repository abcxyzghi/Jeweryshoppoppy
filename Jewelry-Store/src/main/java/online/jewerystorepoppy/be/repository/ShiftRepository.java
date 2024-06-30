package online.jewerystorepoppy.be.repository;

import online.jewerystorepoppy.be.entity.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, Long> {
    List<Shift> findShiftsByStaffId(long accountId);
    List<Shift> findShiftsByFromTimeBetween(Date fromDate, Date toDate);
}
