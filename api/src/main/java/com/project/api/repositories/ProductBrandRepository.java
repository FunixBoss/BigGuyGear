package com.project.api.repositories;

import com.project.api.entities.ProductBrand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "productBrands", path="product-brands")
public interface ProductBrandRepository extends JpaRepository<ProductBrand, Integer> {
}
