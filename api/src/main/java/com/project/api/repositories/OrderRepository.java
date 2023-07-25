package com.project.api.repositories;

import com.project.api.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "orders", path="orders")
public interface OrderRepository extends JpaRepository<Order, Integer> {
}
