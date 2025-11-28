// backend/src/main/java/com/klef/controller/PageController.java

package com.klef.controller;

import com.klef.entity.PageEntity;
import com.klef.service.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PageController {

    @Autowired
    private PageService pageService;

    @GetMapping("/pages")
    public List<PageEntity> getAll() {
        return pageService.getAllPages();
    }

    @GetMapping("/pages/{id}")
    public PageEntity getById(@PathVariable Long id) {
        return pageService.getPageById(id);
    }

    // FIXED: Use @PathVariable with proper encoding
    @GetMapping("/pages/title/{title}")
    public PageEntity getByTitle(@PathVariable String title) {
        // Replace %20 with space
        String decodedTitle = title.replace("%20", " ");
        return pageService.getPageByTitle(decodedTitle);
    }

    @PostMapping("/pages")
    public PageEntity add(@RequestBody PageEntity page) {
        return pageService.addPage(page);
    }

    @PutMapping("/pages/{id}")
    public PageEntity update(@PathVariable Long id, @RequestBody PageEntity page) {
        return pageService.updatePage(id, page);
    }

    @DeleteMapping("/pages/{id}")
    public void delete(@PathVariable Long id) {
        pageService.deletePage(id);
    }
}