package com.klef.repository;

import com.klef.entity.FoodItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface FoodItemRepository extends JpaRepository<FoodItemEntity, Long> {
    List<FoodItemEntity> findByDonor_Id(Long donorId);
    List<FoodItemEntity> findByDonatedDateBetween(Date startDate, Date endDate);

    // NOTE: if you later add a 'status' field to FoodItemEntity, you can add:
    // List<FoodItemEntity> findByStatus(String status);
}
