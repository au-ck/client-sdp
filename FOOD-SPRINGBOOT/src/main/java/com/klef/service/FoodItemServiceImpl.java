package com.klef.service;

import com.klef.entity.FoodItemEntity;
import com.klef.entity.UserEntity;
import com.klef.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FoodItemServiceImpl implements FoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepository;

    // Adjust to your environment
    private static final String UPLOAD_DIR = "D:/uploads/";

    @Override
    public List<FoodItemEntity> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    @Override
    public FoodItemEntity getFoodItemById(Long id) {
        Optional<FoodItemEntity> opt = foodItemRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public List<FoodItemEntity> getFoodItemsByDonor(Long donorId) {
        if (donorId == null) return List.of();
        return foodItemRepository.findByDonor_Id(donorId);
    }

    @Override
    public FoodItemEntity addFoodItem(FoodItemEntity foodItem, MultipartFile file) {
        // save uploaded file if present
        if (file != null && !file.isEmpty()) {
            try {
                Files.createDirectories(Paths.get(UPLOAD_DIR));
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path filePath = Paths.get(UPLOAD_DIR + fileName);
                Files.write(filePath, file.getBytes());
                foodItem.setImagePath("/uploads/" + fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        // ensure availableQuantity defaults to quantity
        if (foodItem.getAvailableQuantity() == null) {
            foodItem.setAvailableQuantity(foodItem.getQuantity());
        }

        // ensure donatedDate is set
        if (foodItem.getDonatedDate() == null) {
            foodItem.setDonatedDate(new Date());
        }

        return foodItemRepository.save(foodItem);
    }

    @Override
    public FoodItemEntity updateFoodItem(Long id, FoodItemEntity foodItem, MultipartFile file) {
        FoodItemEntity existing = getFoodItemById(id);
        if (existing == null) return null;

        existing.setFoodType(foodItem.getFoodType());
        existing.setDescription(foodItem.getDescription());
        existing.setQuantity(foodItem.getQuantity());
        existing.setExpiryDate(foodItem.getExpiryDate());

        // update available if provided
        if (foodItem.getAvailableQuantity() != null) {
            existing.setAvailableQuantity(foodItem.getAvailableQuantity());
        }

        // update donor (only id to avoid loading full user)
        if (foodItem.getDonor() != null && foodItem.getDonor().getId() != null) {
            UserEntity donor = new UserEntity();
            donor.setId(foodItem.getDonor().getId());
            existing.setDonor(donor);
        }

        // update donatedDate if provided
        if (foodItem.getDonatedDate() != null) {
            existing.setDonatedDate(foodItem.getDonatedDate());
        }

        // update file if provided
        if (file != null && !file.isEmpty()) {
            try {
                Files.createDirectories(Paths.get(UPLOAD_DIR));
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path filePath = Paths.get(UPLOAD_DIR + fileName);
                Files.write(filePath, file.getBytes());
                existing.setImagePath("/uploads/" + fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return foodItemRepository.save(existing);
    }

    /**
     * This method saves the given FoodItemEntity as-is.
     * It satisfies the interface method updateFoodItem(FoodItemEntity).
     * Use it when you already have a complete entity object that should be saved.
     */
    @Override
    public FoodItemEntity updateFoodItem(FoodItemEntity foodItem) {
        if (foodItem == null) return null;

        // Ensure donatedDate exists
        if (foodItem.getDonatedDate() == null) {
            foodItem.setDonatedDate(new Date());
        }

        if (foodItem.getAvailableQuantity() == null) {
            foodItem.setAvailableQuantity(foodItem.getQuantity());
        }

        return foodItemRepository.save(foodItem);
    }

    /**
     * Update status placeholder — your FoodItemEntity currently doesn't have a status field,
     * but the interface requires this method. We'll implement it to be a no-op save
     * so compilation succeeds. If you later add a 'status' column to FoodItemEntity,
     * set it here.
     */
    @Override
    public void updateFoodItemStatus(Long id, String status) {
        FoodItemEntity existing = getFoodItemById(id);
        if (existing != null) {
            // if FoodItemEntity later has a setStatus method, use it:
            // existing.setStatus(status);
            foodItemRepository.save(existing);
        }
    }

    @Override
    public List<FoodItemEntity> getFoodItemsByStatus(String status) {
        // If repository supports findByStatus, prefer it — otherwise return all as fallback
        try {
            // compile-time repository does not declare findByStatus, so fallback:
            return foodItemRepository.findAll();
        } catch (Throwable t) {
            return foodItemRepository.findAll();
        }
    }

    @Override
    public List<Object[]> getReports(Date startDate, Date endDate) {
        List<FoodItemEntity> list = foodItemRepository.findByDonatedDateBetween(startDate, endDate);
        List<Object[]> rows = new ArrayList<>();
        for (FoodItemEntity f : list) {
            String donorName = (f.getDonor() != null) ? f.getDonor().getName() : null;
            rows.add(new Object[]{ f.getId(), f.getFoodType(), donorName, f.getDonatedDate(), f.getQuantity() });
        }
        return rows;
    }
}
