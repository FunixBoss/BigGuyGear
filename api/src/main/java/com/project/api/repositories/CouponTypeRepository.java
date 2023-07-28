package com.project.api.repositories;

import com.project.api.entities.CouponType;
import com.project.api.entities.projection.CouponTypeProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "couponTypes", path="coupon-types",
    excerptProjection = CouponTypeProjection.class)
@CrossOrigin("http://localhost:4200")
public interface CouponTypeRepository extends JpaRepository<CouponType, Integer> {
}
