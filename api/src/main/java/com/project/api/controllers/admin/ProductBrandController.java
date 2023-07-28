package com.project.api.controllers.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.api.dtos.CategoryDTO;
import com.project.api.entities.Category;
import com.project.api.entities.Image;
import com.project.api.entities.ProductBrand;
import com.project.api.services.CategoryService;
import com.project.api.services.ProductBrandService;
import com.project.api.utilities.ImageUploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/product-brands")
public class ProductBrandController {

    @Autowired
    private ProductBrandService brandService;

    @Autowired
    private ImageUploadUtils imageUploadUtils;

    @PostMapping("create")
    public ResponseEntity<Boolean> create(
            @RequestParam("brand") String brandJson,
            @RequestParam("imageFile") MultipartFile imageFile) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ProductBrand brand = objectMapper.readValue(brandJson, ProductBrand.class);

            Image brandImg = new Image(imageUploadUtils.upload("brand", imageFile));
            brand.setImage(brandImg);

            this.brandService.save(brand);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Create Brand Failed");
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("update")
    public ResponseEntity<Boolean> update(
            @RequestParam("brand") String brandJson,
            @RequestParam(name = "imageFile", required = false) MultipartFile imageFile) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ProductBrand brand = objectMapper.readValue(brandJson, ProductBrand.class);
            ProductBrand oldBrand = this.brandService.findById(brand.getProductBrandId());
            if(imageFile != null) {
                imageUploadUtils.delete("brand", oldBrand.getImage().getImageUrl());

                Image brandImg = new Image(imageUploadUtils.upload("brand", imageFile));
                brand.setImage(brandImg);
            } else {
                Image oldBrandImg = oldBrand.getImage();
                brand.setImage(oldBrandImg);
            }

            this.brandService.save(brand);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Update Brand Failed");
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("delete/{brandId}")
    public ResponseEntity<Boolean> delete(@PathVariable("brandId") Integer brandId) {
        try {
            this.brandService.delete(brandId);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("delete-brands")
    public ResponseEntity<Boolean> delete(@RequestBody List<ProductBrand> brands) {
        try {
            this.brandService.delete(brands);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }


}
