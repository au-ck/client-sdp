package com.klef.controller;

import com.klef.entity.CityEntity;
import com.klef.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
public class CityController {
    @Autowired
    private CityService cityService;

    @GetMapping
    public List<CityEntity> getAll() {
        return cityService.getAllCities();
    }

    @GetMapping("/{id}")
    public CityEntity getById(@PathVariable Long id) {
        return cityService.getCityById(id);
    }

    @PostMapping
    public CityEntity add(@RequestBody CityEntity city) {
        return cityService.addCity(city);
    }

    @PutMapping("/{id}")
    public CityEntity update(@PathVariable Long id, @RequestBody CityEntity city) {
        return cityService.updateCity(id, city);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        cityService.deleteCity(id);
    }
}