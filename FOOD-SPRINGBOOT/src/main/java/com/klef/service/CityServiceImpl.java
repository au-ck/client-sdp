package com.klef.service;

import com.klef.entity.CityEntity;
import com.klef.repository.CityRepository;
import com.klef.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CityServiceImpl implements CityService {
    @Autowired
    private CityRepository cityRepository;

    @Override
    public List<CityEntity> getAllCities() {
        return cityRepository.findAll();
    }

    @Override
    public CityEntity getCityById(Long id) {
        return cityRepository.findById(id).orElse(null);
    }

    @Override
    public CityEntity addCity(CityEntity city) {
        return cityRepository.save(city);
    }

    @Override
    public CityEntity updateCity(Long id, CityEntity city) {
        CityEntity existing = getCityById(id);
        if (existing != null) {
            existing.setName(city.getName());
            existing.setState(city.getState());
            return cityRepository.save(existing);
        }
        return null;
    }

    @Override
    public void deleteCity(Long id) {
        cityRepository.deleteById(id);
    }
}