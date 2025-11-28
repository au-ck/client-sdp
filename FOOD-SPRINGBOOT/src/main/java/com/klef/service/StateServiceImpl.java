package com.klef.service;

import com.klef.entity.StateEntity;
import com.klef.repository.StateRepository;
import com.klef.service.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StateServiceImpl implements StateService {
    @Autowired
    private StateRepository stateRepository;

    @Override
    public List<StateEntity> getAllStates() {
        return stateRepository.findAll();
    }

    @Override
    public StateEntity getStateById(Long id) {
        return stateRepository.findById(id).orElse(null);
    }

    @Override
    public StateEntity addState(StateEntity state) {
        return stateRepository.save(state);
    }

    @Override
    public StateEntity updateState(Long id, StateEntity state) {
        StateEntity existing = getStateById(id);
        if (existing != null) {
            existing.setName(state.getName());
            return stateRepository.save(existing);
        }
        return null;
    }

    @Override
    public void deleteState(Long id) {
        stateRepository.deleteById(id);
    }
}