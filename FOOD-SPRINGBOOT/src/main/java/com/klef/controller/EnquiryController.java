package com.klef.controller;

import com.klef.entity.EnquiryEntity;
import com.klef.service.EnquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {
    @Autowired
    private EnquiryService enquiryService;

    @GetMapping
    public List<EnquiryEntity> getAll() {
        return enquiryService.getAllEnquiries();
    }

    @GetMapping("/{id}")
    public EnquiryEntity getById(@PathVariable Long id) {
        return enquiryService.getEnquiryById(id);
    }

    @PostMapping
    public EnquiryEntity add(@RequestBody EnquiryEntity enquiry) {
        return enquiryService.addEnquiry(enquiry);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        enquiryService.deleteEnquiry(id);
    }
}