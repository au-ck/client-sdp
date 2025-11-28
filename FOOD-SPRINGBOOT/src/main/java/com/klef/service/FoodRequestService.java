package com.klef.service;

import com.klef.entity.FoodRequestEntity;
import java.util.List;

public interface FoodRequestService {

    List<FoodRequestEntity> getAllRequests();
    FoodRequestEntity getRequestById(Long id);

    FoodRequestEntity createRequest(FoodRequestEntity request);
    FoodRequestEntity updateRequestStatus(Long id, String status);

    void deleteRequest(Long id);

    List<FoodRequestEntity> getRequestsByFoodItemId(Long foodItemId);
    List<FoodRequestEntity> getRequestsByUserId(Long userId);
    List<FoodRequestEntity> getRequestsByDonorId(Long donorId);

    // This one is used in MyRequests page
    List<FoodRequestEntity> getRequestsByPhone(String phone);

    // Search single request by id (wraps repository findById)
    FoodRequestEntity searchByRequestNumber(Long id);
}
