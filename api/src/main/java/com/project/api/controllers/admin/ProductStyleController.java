package com.project.api.controllers.admin;

import com.project.api.entities.ProductStyle;
import com.project.api.services.ProductStyleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/product-styles")
public class ProductStyleController {

    @Autowired
    private ProductStyleService styleService;

    @DeleteMapping("{styleId}")
    public ResponseEntity delete(@PathVariable("styleId") Integer styleId) {
        try {
            this.styleService.delete(styleId);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_GATEWAY);
        }
    }

    @PostMapping("delete-styles")
    public ResponseEntity delete(@RequestBody List<ProductStyle> styles) {
        try {
            this.styleService.delete(styles);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
