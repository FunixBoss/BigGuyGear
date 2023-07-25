package com.project.api.repositories;

import com.project.api.entities.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "orderStatuses", path="order-statuses")
public interface OrderStatusRepository extends JpaRepository<OrderStatus, Integer> {
}
