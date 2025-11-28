package com.klef.repository;

import com.klef.entity.EnquiryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnquiryRepository extends JpaRepository<EnquiryEntity, Long> {}