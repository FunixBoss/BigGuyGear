package com.project.api.repositories;

import com.project.api.entities.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "productSizes", path="product-sizes")
public interface ProductSizeRepository extends JpaRepository<ProductSize, Integer> {
}
