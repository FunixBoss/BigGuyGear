package com.project.api.services.impl;

import com.project.api.dtos.CategoryDTO;
import com.project.api.entities.Category;
import com.project.api.repositories.CategoryRepository;
import com.project.api.repositories.ProductRepository;
import com.project.api.services.CategoryService;
import com.project.api.services.ProductService;
import com.project.api.utilities.ImageUploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageUploadUtils imageUploadUtils;

    @Override
    public List<CategoryDTO> findAll() {
        return categoryRepository.findAllWithImage();
    }

    @Override
    public Category findById(Integer id) {
        return categoryRepository.findById(id).get();
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Boolean delete(Integer id) {
        try {
            Category category = this.findById(id);
            this.imageUploadUtils.delete("category", category.getImage().getImageUrl());
            category.getProducts().stream().forEach(product -> {
                product.setCategory(null);
                productRepository.save(product);
            });
            this.categoryRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean delete(List<Category> categories) {
        try {
            categories.stream().forEach(cate -> {
                this.delete(cate.getCategoryId());
            });
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    @Override
    public Long count() {
        return categoryRepository.count();
    }
}
