package com.project.api.repositories;

import com.project.api.entities.Order;
import com.project.api.entities.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "orders", path="orders")
@CrossOrigin("http://localhost:4200")
public interface OrderRepository extends JpaRepository<Order, Integer> {

}
