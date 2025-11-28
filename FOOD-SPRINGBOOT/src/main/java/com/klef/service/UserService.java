package com.klef.service;

import com.klef.entity.UserEntity;
import java.util.List;
import java.util.Map;

public interface UserService {
    List<UserEntity> getAllUsers();
    UserEntity getUserById(Long id);
    UserEntity addUser(UserEntity user);
    UserEntity updateUser(Long id, UserEntity user);
    void deleteUser(Long id);
    UserEntity login(String email, String password);
    UserEntity registerDonor(UserEntity donor);
    void updatePassword(String email, String newPassword);
    List<UserEntity> getDonors();
    Map<String, Long> getDashboardCounts();
}
