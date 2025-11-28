package com.klef.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.entity.CityEntity;
import com.klef.entity.UserEntity;
import com.klef.repository.CityRepository;
import com.klef.repository.FoodItemRepository;
import com.klef.repository.FoodRequestRepository;
import com.klef.repository.StateRepository;
import com.klef.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Autowired
    private FoodRequestRepository foodRequestRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private StateRepository stateRepository;

    @Override
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserEntity getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public UserEntity addUser(UserEntity user) {
        return userRepository.save(user);
    }

    @Override
    public UserEntity updateUser(Long id, UserEntity user) {
        UserEntity existing = getUserById(id);
        if (existing != null) {
            existing.setName(user.getName());
            existing.setEmail(user.getEmail());
            existing.setPhone(user.getPhone());
            existing.setAddress(user.getAddress());
            existing.setCity(user.getCity());

            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                existing.setPassword(user.getPassword());
            }

            return userRepository.save(existing);
        }
        return null;
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserEntity login(String email, String password) {
        UserEntity user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    /* ----------------------------------------------------
       UPDATED registerDonor() — supports manual city input
    ------------------------------------------------------- */
    @Override
    public UserEntity registerDonor(UserEntity donor) {

        donor.setRole("DONOR");

        // Handle manual city name
        if (donor.getCity() != null && donor.getCity().getName() != null) {

            String cityName = donor.getCity().getName().trim();

            if (!cityName.isEmpty()) {

                // Check if city exists
                CityEntity existingCity = cityRepository.findByName(cityName);

                if (existingCity != null) {
                    donor.setCity(existingCity);
                } else {
                    // Create new city
                    CityEntity newCity = new CityEntity();
                    newCity.setName(cityName);
                    newCity.setState(null); // Optional

                    newCity = cityRepository.save(newCity);
                    donor.setCity(newCity);
                }
            }
        }

        return userRepository.save(donor);
    }

    @Override
    public void updatePassword(String email, String newPassword) {
        UserEntity user = userRepository.findByEmail(email);
        if (user != null) {
            user.setPassword(newPassword);
            userRepository.save(user);
        }
    }

    @Override
    public List<UserEntity> getDonors() {
        return userRepository.findByRole("DONOR");
    }

    @Override
    public Map<String, Long> getDashboardCounts() {
        Map<String, Long> data = new HashMap<>();
        data.put("totalStates", stateRepository.count());
        data.put("totalCities", cityRepository.count());
        data.put("totalDonors", (long) getDonors().size());
        data.put("totalFoodItems", foodItemRepository.count());
        data.put("newRequests", (long) foodRequestRepository.findByStatus("NEW").size());
        data.put("rejectedRequests", (long) foodRequestRepository.findByStatus("REJECTED").size());
        data.put("completedRequests", (long) foodRequestRepository.findByStatus("COMPLETED").size());
        return data;
    }
}
