package com.klef.service;

import com.klef.entity.FoodRequestEntity;
import com.klef.repository.FoodRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodRequestServiceImpl implements FoodRequestService {

    @Autowired
    private FoodRequestRepository foodRequestRepository;

    @Override
    public List<FoodRequestEntity> getAllRequests() {
        return foodRequestRepository.findAll();
    }

    @Override
    public FoodRequestEntity getRequestById(Long id) {
        return foodRequestRepository.findById(id).orElse(null);
    }

    @Override
    public FoodRequestEntity createRequest(FoodRequestEntity request) {
        return foodRequestRepository.save(request);
    }

    @Override
    public FoodRequestEntity updateRequestStatus(Long id, String status) {
        FoodRequestEntity req = getRequestById(id);
        if (req != null) {
            req.setStatus(status);
            return foodRequestRepository.save(req);
        }
        return null;
    }

    @Override
    public void deleteRequest(Long id) {
        foodRequestRepository.deleteById(id);
    }

    @Override
    public List<FoodRequestEntity> getRequestsByFoodItemId(Long foodItemId) {
        return foodRequestRepository.findByFoodItemId(foodItemId);
    }

    @Override
    public List<FoodRequestEntity> getRequestsByUserId(Long userId) {
        return foodRequestRepository.findByUserId(userId);
    }

    @Override
    public List<FoodRequestEntity> getRequestsByDonorId(Long donorId) {
        return foodRequestRepository.findByFoodItem_Donor_Id(donorId);
    }

    @Override
    public List<FoodRequestEntity> getRequestsByPhone(String phone) {
        return foodRequestRepository.findByRequesterPhone(phone);
    }

    // <- NEW: support admin /search-food-request
    @Override
    public FoodRequestEntity searchByRequestNumber(Long id) {
        return getRequestById(id);
    }
}
