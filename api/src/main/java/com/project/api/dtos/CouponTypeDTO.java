package com.project.api.dtos;

import com.project.api.entities.Coupon;
import com.project.api.entities.CouponType;
import lombok.Data;

import java.util.Date;

@Data
public class CouponTypeDTO {
    private Integer couponTypeId;
    private String typeName;

    public CouponTypeDTO() {}

    public CouponTypeDTO(CouponType couponType) {
        this.couponTypeId = couponType.getCouponTypeId();
        this.typeName = couponType.getTypeName();
    }
}