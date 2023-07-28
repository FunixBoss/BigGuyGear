package com.project.api.services;


import com.project.api.dtos.ProductBrandDTO;
import com.project.api.entities.ProductBrand;
import com.project.api.entities.ProductStyle;

import java.util.List;

public interface ProductStyleService {

    Boolean delete(Integer id);

    Boolean delete(List<ProductStyle> styles);
}
