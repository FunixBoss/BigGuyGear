package com.project.api.entities.projection;

import com.project.api.entities.Coupon;
import com.project.api.entities.CouponType;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name = "couponType", types = { CouponType.class })
public interface CouponTypeProjection {
    Integer getCouponTypeId();
    String getTypeName();
}
