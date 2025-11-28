package com.klef.service;

import com.klef.entity.FoodItemEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

public interface FoodItemService {

    List<FoodItemEntity> getAllFoodItems();

    FoodItemEntity getFoodItemById(Long id);

    List<FoodItemEntity> getFoodItemsByDonor(Long donorId);

    FoodItemEntity addFoodItem(FoodItemEntity foodItem, MultipartFile file);

    FoodItemEntity updateFoodItem(Long id, FoodItemEntity foodItem, MultipartFile file);

    FoodItemEntity updateFoodItem(FoodItemEntity foodItem);

    void updateFoodItemStatus(Long id, String status);

    List<FoodItemEntity> getFoodItemsByStatus(String status);

    List<Object[]> getReports(Date start, Date end);
}
