package com.project.api.repositories;

import com.project.api.dtos.CategoryDTO;
import com.project.api.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "categories", path="categories" )
@CrossOrigin("http://localhost:4200")
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query("SELECT new com.project.api.dtos.CategoryDTO(c.categoryId, c.image, c.categoryName) FROM Category c")
    List<CategoryDTO> findAllWithImage();

}
