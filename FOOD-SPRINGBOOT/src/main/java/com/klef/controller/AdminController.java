package com.klef.controller;

import com.klef.entity.FoodRequestEntity;
import com.klef.service.FoodItemService;
import com.klef.service.FoodRequestService;
import com.klef.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private FoodItemService foodItemService;

    @Autowired
    private FoodRequestService foodRequestService;

    @GetMapping("/dashboard")
    public Map<String, Long> getDashboard() {
        return userService.getDashboardCounts();
    }

    /**
     * Robust donated food report endpoint.
     * Expects query strings `start` and `end` in yyyy-MM-dd format (HTML date input).
     * Converts to start-of-day and end-of-day (inclusive) and calls service.
     */
    @GetMapping("/reports/donated-food")
    public List<Object[]> getDonatedFoodReport(
            @RequestParam("start") String startStr,
            @RequestParam("end") String endStr) {

        // validate
        if (startStr == null || startStr.isBlank() || endStr == null || endStr.isBlank()) {
            System.out.println("reports: missing start or end param");
            return new ArrayList<>();
        }

        try {
            // parse ISO date (yyyy-MM-dd)
            LocalDate startLocal = LocalDate.parse(startStr);
            LocalDate endLocal = LocalDate.parse(endStr);

            // convert to Date covering entire days
            ZoneId zone = ZoneId.systemDefault();
            ZonedDateTime zStart = startLocal.atStartOfDay(zone);
            // end at 23:59:59.999 to include the full end day
            ZonedDateTime zEnd = endLocal.atTime(23, 59, 59, 999_000_000).atZone(zone);

            Date startDate = Date.from(zStart.toInstant());
            Date endDate = Date.from(zEnd.toInstant());

            System.out.println("Admin reports: start=" + startDate + " end=" + endDate);

            return foodItemService.getReports(startDate, endDate);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ArrayList<>();
        }
    }

    @GetMapping("/reports/registered-donors")
    public List<?> getRegisteredDonors() {
        return userService.getDonors();
    }

    // Return single object for a request number lookup
    @GetMapping("/search-food-request")
    public FoodRequestEntity searchFoodRequest(@RequestParam Long requestNumber) {
        return foodRequestService.searchByRequestNumber(requestNumber);
    }
}
