// src/main/java/com/klef/controller/FoodRequestController.java

package com.klef.controller;

import com.klef.entity.FoodRequestEntity;
import com.klef.entity.FoodItemEntity;
import com.klef.service.FoodItemService;
import com.klef.service.FoodRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class FoodRequestController {

    @Autowired
    private FoodRequestService foodRequestService;

    @Autowired
    private FoodItemService foodItemService;

    // GET ALL REQUESTS (Admin / debug)
    @GetMapping("/food-requests")
    public List<FoodRequestEntity> getAllRequests() {
        return foodRequestService.getAllRequests();
    }

    // GET REQUESTS BY USER PHONE (FOR MY REQUESTS PAGE)
    @GetMapping("/food-requests/my")
    public List<FoodRequestEntity> getMyRequests(@RequestParam String phone) {
        return foodRequestService.getRequestsByPhone(phone);
    }

    // NEW: GET REQUESTS BY FOOD ITEM ID
    // This is the endpoint your DonorRequests.jsx expects:
    // GET /api/food-requests/food-item/{foodItemId}
    @GetMapping("/food-requests/food-item/{foodItemId}")
    public ResponseEntity<List<FoodRequestEntity>> getRequestsByFoodItem(@PathVariable Long foodItemId) {
        try {
            List<FoodRequestEntity> list = foodRequestService.getRequestsByFoodItemId(foodItemId);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // (Optional) GET REQUESTS BY DONOR ID - useful for a single call to fetch all requests for a donor
    // If your frontend switches to this, call: GET /api/food-requests/donor/{donorId}
    @GetMapping("/food-requests/donor/{donorId}")
    public ResponseEntity<List<FoodRequestEntity>> getRequestsByDonor(@PathVariable Long donorId) {
        try {
            List<FoodRequestEntity> list = foodRequestService.getRequestsByDonorId(donorId);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // CREATE NEW REQUEST
    @PostMapping("/food-requests")
    public ResponseEntity<FoodRequestEntity> createRequest(@RequestBody FoodRequestEntity request) {
        try {
            // validate presence of foodItem -> id
            if (request == null || request.getFoodItem() == null || request.getFoodItem().getId() == null) {
                return ResponseEntity.badRequest().build();
            }

            Long foodItemId = request.getFoodItem().getId();
            FoodItemEntity food = foodItemService.getFoodItemById(foodItemId);
            if (food == null) {
                return ResponseEntity.badRequest().build();
            }

            // sanitize requested quantity
            if (request.getRequestedQuantity() == null || request.getRequestedQuantity() <= 0) {
                request.setRequestedQuantity(1);
            }

            // Prevent requesting more than available if availableQuantity is set
            Integer available = (food.getAvailableQuantity() != null) ? food.getAvailableQuantity() : food.getQuantity();
            if (available != null && request.getRequestedQuantity() > available) {
                return ResponseEntity.badRequest().build();
            }

            // attach resolved food entity and defaults
            request.setFoodItem(food);
            if (request.getRequesterName() == null) request.setRequesterName("Anonymous");
            if (request.getRequesterEmail() == null) request.setRequesterEmail("Not Provided");
            if (request.getRequesterPhone() == null) request.setRequesterPhone("Not Provided");
            if (request.getRequesterAddress() == null) request.setRequesterAddress("Not Provided");
            if (request.getStatus() == null) request.setStatus("PENDING");
            request.setCreatedDate(new Date());

            FoodRequestEntity saved = foodRequestService.createRequest(request);

            // Update FoodItem availableQuantity (best-effort)
            try {
                if (available != null) {
                    int newAvailable = available - request.getRequestedQuantity();
                    if (newAvailable < 0) newAvailable = 0;
                    food.setAvailableQuantity(newAvailable);
                    foodItemService.updateFoodItem(food);
                }
            } catch (Exception ex) {
                ex.printStackTrace();
                // don't fail the whole request if updating quantity fails
            }

            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // UPDATE STATUS
    @PutMapping("/food-requests/{id}/status")
    public ResponseEntity<FoodRequestEntity> updateStatus(@PathVariable Long id, @RequestBody String status) {
        String cleanStatus = status == null ? null : status.replace("\"", "").trim();
        FoodRequestEntity updated = foodRequestService.updateRequestStatus(id, cleanStatus);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // GET REQUESTS BY USER ID (if needed)
    @GetMapping("/food-requests/user/{userId}")
    public List<FoodRequestEntity> getRequestsByUser(@PathVariable Long userId) {
        return foodRequestService.getRequestsByUserId(userId);
    }
}
