package com.project.api.dtos;

import com.project.api.entities.Category;
import com.project.api.entities.Coupon;
import com.project.api.entities.CouponType;
import com.project.api.entities.Image;
import lombok.Data;

import java.util.Date;

@Data
public class CouponDTO {
    private Integer couponId;
    private CouponTypeDTO couponType;
    private String code;
    private int discount;
    private String description;
    private Date startedAt;
    private Date expiredAt;


    public CouponDTO() { }
    public CouponDTO(Coupon coupon) {
        this.couponId = coupon.getCouponId();
        this.couponType = new CouponTypeDTO(coupon.getCouponType());
        this.code = coupon.getCode();
        this.discount = coupon.getDiscount();
        this.description = coupon.getDescription();
        this.startedAt = coupon.getStartedAt();
        this.expiredAt = coupon.getExpiredAt();
    }
}