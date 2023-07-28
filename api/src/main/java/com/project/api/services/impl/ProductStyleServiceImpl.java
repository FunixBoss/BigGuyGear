package com.project.api.services.impl;

import com.project.api.dtos.ProductBrandDTO;
import com.project.api.entities.ProductBrand;
import com.project.api.entities.ProductStyle;
import com.project.api.repositories.ProductBrandRepository;
import com.project.api.repositories.ProductRepository;
import com.project.api.repositories.ProductStyleRepository;
import com.project.api.services.ProductBrandService;
import com.project.api.services.ProductStyleService;
import com.project.api.utilities.ImageUploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductStyleServiceImpl implements ProductStyleService {

    @Autowired
    private ProductStyleRepository styleRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageUploadUtils imageUploadUtils;

    @Override
    public Boolean delete(Integer id) {
        try {
            ProductStyle style = this.styleRepository.findById(id).get();
            style.getProducts().stream().forEach(product -> {
                product.setProductStyle(null);
                productRepository.save(product);
            });
            this.styleRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean delete(List<ProductStyle> styles) {
        try {
            styles.stream().forEach(b -> {
                this.delete(b.getProductStyleId());
            });
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

}
