package com.project.api.repositories;

import com.project.api.entities.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "coupons", path="coupons")
public interface CouponRepository extends JpaRepository<Coupon, Integer> {
}
