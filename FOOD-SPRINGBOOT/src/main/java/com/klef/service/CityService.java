package com.klef.service;

import com.klef.entity.CityEntity;
import java.util.List;

public interface CityService {
    List<CityEntity> getAllCities();
    CityEntity getCityById(Long id);
    CityEntity addCity(CityEntity city);
    CityEntity updateCity(Long id, CityEntity city);
    void deleteCity(Long id);
}