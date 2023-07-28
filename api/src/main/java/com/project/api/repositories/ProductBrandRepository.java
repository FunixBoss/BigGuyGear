package com.project.api.repositories;

import com.project.api.dtos.CategoryDTO;
import com.project.api.dtos.ProductBrandDTO;
import com.project.api.entities.ProductBrand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "productBrands", path="product-brands")
@CrossOrigin("http://localhost:4200")
public interface ProductBrandRepository extends JpaRepository<ProductBrand, Integer> {

    @Query("SELECT new com.project.api.dtos.ProductBrandDTO(c.productBrandId, c.image, c.brandName) FROM ProductBrand c")
    List<ProductBrandDTO> findAllWithImage();

}
