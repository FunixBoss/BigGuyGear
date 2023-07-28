package com.project.api.repositories;

import com.project.api.entities.ProductSize;
import com.project.api.entities.ProductStyle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "productStyles", path="product-styles")
@CrossOrigin("http://localhost:4200")
public interface ProductStyleRepository extends JpaRepository<ProductStyle, Integer> {
}
