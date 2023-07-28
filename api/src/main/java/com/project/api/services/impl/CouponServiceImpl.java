package com.project.api.services.impl;

import com.project.api.dtos.CategoryDTO;
import com.project.api.entities.Category;
import com.project.api.entities.Coupon;
import com.project.api.repositories.CategoryRepository;
import com.project.api.repositories.CouponRepository;
import com.project.api.repositories.OrderRepository;
import com.project.api.services.CategoryService;
import com.project.api.services.CouponService;
import com.project.api.utilities.ImageUploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CouponServiceImpl implements CouponService {

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private OrderRepository orderRepository;

    public Boolean delete(Integer id) {
        try {
            Coupon coupon = couponRepository.findById(id).get();
            coupon.getOrders().stream().forEach(order -> {
                order.setCoupon(null);
                orderRepository.save(order);
            });
            this.couponRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean delete(List<Coupon> coupons) {
        try {
            coupons.stream().forEach(c -> {
                this.delete(c.getCouponId());
            });
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

}