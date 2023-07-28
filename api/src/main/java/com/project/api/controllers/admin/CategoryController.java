package com.project.api.controllers.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.api.dtos.CategoryDTO;
import com.project.api.entities.Category;
import com.project.api.entities.Image;
import com.project.api.services.CategoryService;
import com.project.api.utilities.ImageUploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ImageUploadUtils imageUploadUtils;

    @GetMapping("findAll")
    public ResponseEntity<List<CategoryDTO>> findAllCategoriesWithImage() {
        try {
            return new ResponseEntity<>(this.categoryService.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("create")
    public ResponseEntity<Boolean> create(
            @RequestParam("category") String categoryJson,
            @RequestParam("imageFile") MultipartFile imageFile) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Category category = objectMapper.readValue(categoryJson, Category.class);

            Image categoryImg = new Image(imageUploadUtils.upload("category", imageFile));
            category.setImage(categoryImg);

            this.categoryService.save(category);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Create Category Failed");
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("update")
    public ResponseEntity update(
            @RequestParam("category") String categoryJson,
            @RequestParam(name = "imageFile", required = false) MultipartFile imageFile) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Category category = objectMapper.readValue(categoryJson, Category.class);
            Category oldCategory = this.categoryService.findById(category.getCategoryId());
            if(imageFile != null) {
                imageUploadUtils.delete("category", oldCategory.getImage().getImageUrl());

                Image categoryImg = new Image(imageUploadUtils.upload("category", imageFile));
                category.setImage(categoryImg);
            } else {
                Image oldCateImg = oldCategory.getImage();
                category.setImage(oldCateImg);
            }

            this.categoryService.save(category);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Update Category Failed");
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("delete/{categoryId}")
    public ResponseEntity<Boolean> delete(@PathVariable("categoryId") Integer categoryId) {
        try {
            this.categoryService.delete(categoryId);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("delete-categories")
    public ResponseEntity<Boolean> delete(@RequestBody List<Category> categories) {
        try {
            this.categoryService.delete(categories);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }


}
