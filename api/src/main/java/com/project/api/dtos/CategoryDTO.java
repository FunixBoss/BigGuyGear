package com.project.api.dtos;

import com.project.api.entities.Category;
import com.project.api.entities.Image;
import lombok.Data;

@Data
public class CategoryDTO {
    private Integer categoryId;
    private String categoryName;
    private ImageDTO image;

    public CategoryDTO(Category category) {
        this.categoryId = category.getCategoryId();
        this.categoryName = category.getCategoryName();
        this.image = new ImageDTO(category.getImage());
    }

    public CategoryDTO(Integer categoryId, Image image, String categoryName) {
        this.categoryId = categoryId;
        this.image = new ImageDTO(image);
        this.categoryName = categoryName;
    }
}