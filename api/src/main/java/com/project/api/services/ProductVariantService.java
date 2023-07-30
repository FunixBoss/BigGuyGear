package com.project.api.services;


import com.project.api.dtos.CategoryDTO;
import com.project.api.entities.Category;
import com.project.api.entities.ProductVariant;

import java.util.List;

public interface ProductVariantService {
    ProductVariant findById(Integer id);

    Boolean deleteById(Integer id);
}
