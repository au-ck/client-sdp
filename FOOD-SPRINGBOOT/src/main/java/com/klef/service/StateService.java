package com.klef.service;

import com.klef.entity.StateEntity;
import java.util.List;

public interface StateService {
    List<StateEntity> getAllStates();
    StateEntity getStateById(Long id);
    StateEntity addState(StateEntity state);
    StateEntity updateState(Long id, StateEntity state);
    void deleteState(Long id);
}