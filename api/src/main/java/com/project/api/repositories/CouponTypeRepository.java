package com.project.api.repositories;

import com.project.api.entities.CouponType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "couponTypes", path="coupon-types")
public interface CouponTypeRepository extends JpaRepository<CouponType, Integer> {
}
