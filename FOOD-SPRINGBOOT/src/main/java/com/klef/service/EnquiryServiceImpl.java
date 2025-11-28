package com.klef.service;

import com.klef.entity.EnquiryEntity;
import com.klef.repository.EnquiryRepository;
import com.klef.service.EnquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class EnquiryServiceImpl implements EnquiryService {
    @Autowired
    private EnquiryRepository enquiryRepository;

    @Override
    public List<EnquiryEntity> getAllEnquiries() {
        return enquiryRepository.findAll();
    }

    @Override
    public EnquiryEntity getEnquiryById(Long id) {
        return enquiryRepository.findById(id).orElse(null);
    }

    @Override
    public EnquiryEntity addEnquiry(EnquiryEntity enquiry) {
        enquiry.setCreatedDate(new Date());
        return enquiryRepository.save(enquiry);
    }

    @Override
    public void deleteEnquiry(Long id) {
        enquiryRepository.deleteById(id);
    }
}