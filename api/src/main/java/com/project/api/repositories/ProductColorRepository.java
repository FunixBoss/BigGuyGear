package com.project.api.repositories;

import com.project.api.entities.ProductBrand;
import com.project.api.entities.ProductColor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "productColors", path="product-colors")
public interface ProductColorRepository extends JpaRepository<ProductColor, Integer> {
}
