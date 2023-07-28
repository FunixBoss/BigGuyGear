package com.project.api.controllers.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.api.dtos.CategoryDTO;
import com.project.api.entities.Category;
import com.project.api.entities.Coupon;
import com.project.api.entities.Image;
import com.project.api.services.CategoryService;
import com.project.api.services.CouponService;
import com.project.api.utilities.ImageUploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/coupons")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @DeleteMapping("delete/{couponId}")
    public ResponseEntity delete(@PathVariable("couponId") Integer couponId) {
        try {
            this.couponService.delete(couponId);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_GATEWAY);
        }
    }

    @PostMapping("delete-coupons")
    public ResponseEntity<Boolean> delete(@RequestBody List<Coupon> coupons) {
        try {
            this.couponService.delete(coupons);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }


}
