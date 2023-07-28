package com.project.api.repositories;

import com.project.api.entities.ProductBrand;
import com.project.api.entities.ProductColor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "productColors", path="product-colors")
@CrossOrigin("http://localhost:4200")
public interface ProductColorRepository extends JpaRepository<ProductColor, Integer> {
}
