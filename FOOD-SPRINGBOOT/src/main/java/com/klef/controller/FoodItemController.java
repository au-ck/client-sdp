package com.klef.controller;

import com.klef.entity.FoodItemEntity;
import com.klef.entity.UserEntity;
import com.klef.service.FoodItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class FoodItemController {

    @Autowired
    private FoodItemService foodItemService;

    // GET ALL FOOD ITEMS (for Available Food, Admin List, etc.)
    @GetMapping("/food-items")
    public List<FoodItemEntity> getAllFoodItems() {
        return foodItemService.getAllFoodItems();
    }

    // GET SINGLE FOOD ITEM BY ID → THIS FIXES YOUR 404 ERROR
    @GetMapping("/food-items/{id}")
    public ResponseEntity<FoodItemEntity> getFoodItemById(@PathVariable Long id) {
        FoodItemEntity food = foodItemService.getFoodItemById(id);
        if (food == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(food);
    }

    // GET FOOD ITEMS BY DONOR ID (for Donor → My Listed Food)
    @GetMapping("/food-items/donor/{donorId}")
    public ResponseEntity<List<FoodItemEntity>> getFoodItemsByDonor(@PathVariable Long donorId) {
        List<FoodItemEntity> list = foodItemService.getFoodItemsByDonor(donorId);
        return ResponseEntity.ok(list);
    }

    // ADD NEW FOOD ITEM (with image upload
    @PostMapping(value = "/food-items", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FoodItemEntity> addFoodItem(
            @RequestParam("foodType") String foodType,
            @RequestParam("description") String description,
            @RequestParam("quantity") Integer quantity,
            @RequestParam("expiryDate") String expiryDate,
            @RequestParam("donorId") Long donorId,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        try {
            FoodItemEntity food = new FoodItemEntity();
            food.setFoodType(foodType);
            food.setDescription(description);
            food.setQuantity(quantity);
            food.setAvailableQuantity(quantity);
            food.setExpiryDate(java.sql.Date.valueOf(expiryDate));

            UserEntity donor = new UserEntity();
            donor.setId(donorId);
            food.setDonor(donor);

            FoodItemEntity saved = foodItemService.addFoodItem(food, file);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // UPDATE AVAILABLE QUANTITY AFTER REQUEST (optional future use)
    @PutMapping("/food-items/{id}/reduce")
    public ResponseEntity<FoodItemEntity> reduceQuantity(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> body) {
        try {
            Integer reduceBy = body.get("reduceBy");
            FoodItemEntity food = foodItemService.getFoodItemById(id);
            if (food == null || reduceBy == null || reduceBy <= 0) {
                return ResponseEntity.badRequest().build();
            }
            int newQty = (food.getAvailableQuantity() != null ? food.getAvailableQuantity() : food.getQuantity()) - reduceBy;
            if (newQty < 0) newQty = 0;
            food.setAvailableQuantity(newQty);
            FoodItemEntity updated = foodItemService.updateFoodItem(food);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}