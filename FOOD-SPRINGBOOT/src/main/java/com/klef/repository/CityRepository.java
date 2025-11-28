package com.klef.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.entity.CityEntity;

public interface CityRepository extends JpaRepository<CityEntity, Long> {
    CityEntity findByName(String name);
}
