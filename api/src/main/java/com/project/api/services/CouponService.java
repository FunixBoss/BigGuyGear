package com.project.api.services;


import com.project.api.dtos.CategoryDTO;
import com.project.api.entities.Category;
import com.project.api.entities.Coupon;

import java.util.List;

public interface CouponService {
    Boolean delete(Integer id);
    Boolean delete(List<Coupon> coupons);
}
