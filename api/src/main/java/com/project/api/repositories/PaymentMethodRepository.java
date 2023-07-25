package com.project.api.repositories;

import com.project.api.entities.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "paymentMethods", path="payment-methods")
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Integer> {
}
