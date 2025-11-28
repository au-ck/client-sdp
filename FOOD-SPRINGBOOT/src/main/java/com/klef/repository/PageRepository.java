package com.klef.repository;

import com.klef.entity.PageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PageRepository extends JpaRepository<PageEntity, Long> {
    PageEntity findByTitle(String title);
}