package com.project.api.entities.projection;

import com.project.api.entities.Category;
import com.project.api.entities.Coupon;
import com.project.api.entities.CouponType;
import com.project.api.entities.Image;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name = "full", types = { Coupon.class })
public interface CouponProjection {
    Integer getCouponId();
    String getCode();
    String getDescription();
    Integer getDiscount();
    Date getStartedAt();
    Date getExpiredAt();
    CouponType getCouponType();
}
