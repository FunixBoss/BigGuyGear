package com.project.api.services;


import com.project.api.dtos.CategoryDTO;
import com.project.api.dtos.ProductBrandDTO;
import com.project.api.entities.Category;
import com.project.api.entities.Product;
import com.project.api.entities.ProductBrand;

import java.util.List;

public interface ProductBrandService {
    List<ProductBrandDTO> findAll();

    ProductBrand findById(Integer id);

    ProductBrand save(ProductBrand brand);

    Boolean delete(Integer id);

    Boolean delete(List<ProductBrand> brands);
    Long count();
}
