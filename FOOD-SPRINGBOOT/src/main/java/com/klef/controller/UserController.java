package com.klef.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.entity.UserEntity;
import com.klef.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserEntity> getAll() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserEntity getById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public UserEntity add(@RequestBody UserEntity user) {
        return userService.addUser(user);
    }

    @PutMapping("/{id}")
    public UserEntity update(@PathVariable Long id, @RequestBody UserEntity user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PostMapping("/login")
    public UserEntity login(@RequestBody Map<String, String> creds) {
        return userService.login(creds.get("email"), creds.get("password"));
    }

    @PostMapping("/register-donor") // POST http://localhost:8080/api/users/register-donor
    public ResponseEntity<?> registerDonor(@RequestBody UserEntity donor) {
        try {
            UserEntity savedUser = userService.registerDonor(donor);
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/update-password")
    public void updatePassword(@RequestBody Map<String, String> data) {
        userService.updatePassword(data.get("email"), data.get("newPassword"));
    }

    @GetMapping("/donors")
    public List<UserEntity> getDonors() {
        return userService.getDonors();
    }
}