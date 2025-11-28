// src/main/java/com/klef/entity/FoodRequestEntity.java

package com.klef.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "food_requests")
public class FoodRequestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String requesterName;
    private String requesterEmail;
    private String requesterPhone;
    private String requesterAddress;

    @ManyToOne(fetch = FetchType.EAGER)  // IMPORTANT: Load foodItem with request
    @JoinColumn(name = "food_item_id")
    private FoodItemEntity foodItem;

    private String status = "PENDING";  // Default
    private Date createdDate = new Date();

    private Long userId;
    private Integer requestedQuantity = 1;

    // GETTERS & SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRequesterName() { return requesterName; }
    public void setRequesterName(String requesterName) { this.requesterName = requesterName; }

    public String getRequesterEmail() { return requesterEmail; }
    public void setRequesterEmail(String requesterEmail) { this.requesterEmail = requesterEmail; }

    public String getRequesterPhone() { return requesterPhone; }
    public void setRequesterPhone(String requesterPhone) { this.requesterPhone = requesterPhone; }

    public String getRequesterAddress() { return requesterAddress; }
    public void setRequesterAddress(String requesterAddress) { this.requesterAddress = requesterAddress; }

    public FoodItemEntity getFoodItem() { return foodItem; }
    public void setFoodItem(FoodItemEntity foodItem) { this.foodItem = foodItem; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Date getCreatedDate() { return createdDate; }
    public void setCreatedDate(Date createdDate) { this.createdDate = createdDate; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Integer getRequestedQuantity() { return requestedQuantity; }
    public void setRequestedQuantity(Integer requestedQuantity) {
        this.requestedQuantity = (requestedQuantity != null && requestedQuantity > 0) ? requestedQuantity : 1;
    }
}