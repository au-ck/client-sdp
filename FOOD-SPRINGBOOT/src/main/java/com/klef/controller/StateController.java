package com.klef.controller;

import com.klef.entity.StateEntity;
import com.klef.service.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/states")
public class StateController {
    @Autowired
    private StateService stateService;

    @GetMapping
    public List<StateEntity> getAll() {
        return stateService.getAllStates();
    }

    @GetMapping("/{id}")
    public StateEntity getById(@PathVariable Long id) {
        return stateService.getStateById(id);
    }

    @PostMapping
    public StateEntity add(@RequestBody StateEntity state) {
        return stateService.addState(state);
    }

    @PutMapping("/{id}")
    public StateEntity update(@PathVariable Long id, @RequestBody StateEntity state) {
        return stateService.updateState(id, state);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        stateService.deleteState(id);
    }
}