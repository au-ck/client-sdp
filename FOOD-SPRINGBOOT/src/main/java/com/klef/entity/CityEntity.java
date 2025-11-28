package com.klef.entity;

import jakarta.persistence.*;

@Entity
public class CityEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    private StateEntity state;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public StateEntity getState() { return state; }
    public void setState(StateEntity state) { this.state = state; }
}
