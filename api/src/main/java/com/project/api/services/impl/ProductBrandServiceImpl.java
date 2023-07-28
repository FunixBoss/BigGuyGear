package com.project.api.services.impl;

import com.project.api.dtos.CategoryDTO;
import com.project.api.dtos.ProductBrandDTO;
import com.project.api.entities.Category;
import com.project.api.entities.ProductBrand;
import com.project.api.repositories.CategoryRepository;
import com.project.api.repositories.ProductBrandRepository;
import com.project.api.repositories.ProductRepository;
import com.project.api.services.CategoryService;
import com.project.api.services.ProductBrandService;
import com.project.api.utilities.ImageUploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductBrandServiceImpl implements ProductBrandService {

    @Autowired
    private ProductBrandRepository brandRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageUploadUtils imageUploadUtils;

    @Override
    public List<ProductBrandDTO> findAll() {
        return brandRepository.findAllWithImage();
    }

    @Override
    public ProductBrand findById(Integer id) {
        return brandRepository.findById(id).get();
    }

    @Override
    public ProductBrand save(ProductBrand brand) {
        return brandRepository.save(brand);
    }

    @Override
    public Boolean delete(Integer id) {
        try {
            ProductBrand brand = this.findById(id);
            this.imageUploadUtils.delete("brand", brand.getImage().getImageUrl());

            brand.getProducts().stream().forEach(product -> {
                product.setProductBrand(null);
                productRepository.save(product);
            });
            this.brandRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean delete(List<ProductBrand> brands) {
        try {
            brands.stream().forEach(b -> {
                this.delete(b.getProductBrandId());
            });
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    @Override
    public Long count() {
        return brandRepository.count();
    }
}
