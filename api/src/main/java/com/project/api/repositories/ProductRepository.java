package com.project.api.repositories;

import com.project.api.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "products", path="products")
public interface ProductRepository extends JpaRepository<Product, Integer> {
}
