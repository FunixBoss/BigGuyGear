package com.project.api.dtos;

import com.project.api.entities.Category;
import com.project.api.entities.Image;
import com.project.api.entities.ProductBrand;
import lombok.Data;

@Data
public class ProductBrandDTO {
    private Integer productBrandId;
    private String brandName;
    private ImageDTO image;

    public ProductBrandDTO(ProductBrand brand) {
        this.productBrandId = brand.getProductBrandId();
        this.brandName = brand.getBrandName();
        this.image = new ImageDTO(brand.getImage());
    }

    public ProductBrandDTO(Integer categoryId, Image image, String categoryName) {
        this.productBrandId = categoryId;
        this.image = new ImageDTO(image);
        this.brandName = categoryName;
    }
}