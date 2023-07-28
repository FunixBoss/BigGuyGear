package com.project.api.repositories;

import com.project.api.entities.Coupon;
import com.project.api.entities.projection.CouponProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "coupons", path="coupons",
        excerptProjection = CouponProjection.class)
@CrossOrigin("http://localhost:4200")
public interface CouponRepository extends JpaRepository<Coupon, Integer> {
}
