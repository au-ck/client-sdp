package com.klef.repository;

import com.klef.entity.FoodRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRequestRepository extends JpaRepository<FoodRequestEntity, Long> {

    List<FoodRequestEntity> findByFoodItemId(Long foodItemId);
    List<FoodRequestEntity> findByUserId(Long userId);

    @Query("SELECT r FROM FoodRequestEntity r WHERE r.foodItem.donor.id = ?1")
    List<FoodRequestEntity> findByFoodItem_Donor_Id(Long donorId);

    // This is used by MyRequests page
    List<FoodRequestEntity> findByRequesterPhone(String phone);

    // Used by dashboard counts / admin filters
    List<FoodRequestEntity> findByStatus(String status);
}
