package com.project.api.controllers.admin;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/admin/products")
public class ProductController {

    @GetMapping("")
    public ResponseEntity<Object> findAll() {
        try {
            return new ResponseEntity<>(new Object(), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
