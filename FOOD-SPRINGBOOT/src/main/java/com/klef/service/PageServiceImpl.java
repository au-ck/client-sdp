package com.klef.service;

import com.klef.entity.PageEntity;
import com.klef.repository.PageRepository;
import com.klef.service.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PageServiceImpl implements PageService {
    @Autowired
    private PageRepository pageRepository;

    @Override
    public List<PageEntity> getAllPages() {
        return pageRepository.findAll();
    }

    @Override
    public PageEntity getPageById(Long id) {
        return pageRepository.findById(id).orElse(null);
    }

    @Override
    public PageEntity getPageByTitle(String title) {
        return pageRepository.findByTitle(title);
    }

    @Override
    public PageEntity addPage(PageEntity page) {
        return pageRepository.save(page);
    }

    @Override
    public PageEntity updatePage(Long id, PageEntity page) {
        PageEntity existing = getPageById(id);
        if (existing != null) {
            existing.setTitle(page.getTitle());
            existing.setContent(page.getContent());
            return pageRepository.save(existing);
        }
        return null;
    }

    @Override
    public void deletePage(Long id) {
        pageRepository.deleteById(id);
    }
}