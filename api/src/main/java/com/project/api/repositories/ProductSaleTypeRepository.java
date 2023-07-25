package com.project.api.repositories;

import com.project.api.entities.ProductSale;
import com.project.api.entities.ProductSaleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "productSaleTypes", path="product-sale-types")
public interface ProductSaleTypeRepository extends JpaRepository<ProductSaleType, Integer> {
}
