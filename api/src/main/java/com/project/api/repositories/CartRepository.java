package com.project.api.repositories;

import com.project.api.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "carts", path="carts")
public interface CartRepository extends JpaRepository<Cart, Integer> {
}
