package com.klef.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class FoodItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String foodType;
    private String description;
    private Integer quantity;
    private Integer availableQuantity;

    private String imagePath;
    private Date expiryDate;
    private Date donatedDate;

    @ManyToOne
    private UserEntity donor;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFoodType() { return foodType; }
    public void setFoodType(String foodType) { this.foodType = foodType; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Integer getAvailableQuantity() { return availableQuantity; }
    public void setAvailableQuantity(Integer availableQuantity) { this.availableQuantity = availableQuantity; }

    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }

    public Date getExpiryDate() { return expiryDate; }
    public void setExpiryDate(Date expiryDate) { this.expiryDate = expiryDate; }

    public Date getDonatedDate() { return donatedDate; }
    public void setDonatedDate(Date donatedDate) { this.donatedDate = donatedDate; }

    public UserEntity getDonor() { return donor; }
    public void setDonor(UserEntity donor) { this.donor = donor; }
}