package com.project.api.services;


import com.project.api.dtos.CategoryDTO;
import com.project.api.entities.Category;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> findAll();

    Category findById(Integer id);

    Category save(Category category);

    Boolean delete(Integer id);

    Boolean delete(List<Category> categories);
    Long count();
}
