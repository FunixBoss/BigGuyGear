package com.project.api.repositories;

import com.project.api.entities.ProductReview;
import com.project.api.entities.ProductSale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "productSales", path="product-sales")
public interface ProductSaleRepository extends JpaRepository<ProductSale, Integer> {
}
