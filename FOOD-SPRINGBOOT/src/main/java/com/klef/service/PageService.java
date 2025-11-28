package com.klef.service;

import com.klef.entity.PageEntity;
import java.util.List;

public interface PageService {
    List<PageEntity> getAllPages();
    PageEntity getPageById(Long id);
    PageEntity getPageByTitle(String title);
    PageEntity addPage(PageEntity page);
    PageEntity updatePage(Long id, PageEntity page);
    void deletePage(Long id);
}