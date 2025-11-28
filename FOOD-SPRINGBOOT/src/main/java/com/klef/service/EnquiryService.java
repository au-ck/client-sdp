package com.klef.service;

import com.klef.entity.EnquiryEntity;
import java.util.List;

public interface EnquiryService {
    List<EnquiryEntity> getAllEnquiries();
    EnquiryEntity getEnquiryById(Long id);
    EnquiryEntity addEnquiry(EnquiryEntity enquiry);
    void deleteEnquiry(Long id);
}