package com.project.api.controllers.admin;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.api.dtos.ProductDetailDTO;
import com.project.api.dtos.ProductFindAllDTO;
import com.project.api.entities.Product;
import com.project.api.entities.ProductSale;
import com.project.api.services.ProductService;
import com.project.api.services.ProductVariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductVariantService productVariantService;

    @GetMapping("{productId}")
    public ResponseEntity<ProductDetailDTO> findById(@PathVariable Integer productId) {
        try {
            return new ResponseEntity<>(this.productService.findById(productId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("findAll")
    public ResponseEntity<List<ProductFindAllDTO>> findAll() {
        try {
            return new ResponseEntity<>(productService.findAllDTO(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("update")
    public ResponseEntity<Boolean> update(@RequestBody Product product) {
        try {
            if(this.productService.update(product) != null) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    public ResponseEntity<Boolean> create(@RequestBody Product product) {
        try {
            if(this.productService.save(product) != null) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("{productId}")
    public ResponseEntity<Boolean> delete(@PathVariable Integer productId) {
        try {
            if(this.productService.delete(productId)) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("delete-products")
    public ResponseEntity<Boolean> delete(@RequestBody List<Product> products) {
        try {
            if(this.productService.delete(products)) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("update-new-status")
    public ResponseEntity<Boolean> updateNewStatus(
            @RequestParam("products") String productsJson,
            @RequestParam("new_") Boolean new_) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            List<Product> products = mapper.readValue(productsJson, new TypeReference<List<Product>>() {});

            if(this.productService.updateNewStatus(products, new_)) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("update-top-status")
    public ResponseEntity<Boolean> updateTopStatus(
            @RequestParam("products") String productsJson,
            @RequestParam("top") Boolean top) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            List<Product> products = mapper.readValue(productsJson, new TypeReference<List<Product>>() {});

            if(this.productService.updateTopStatus(products, top)) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("update-active-status")
    public ResponseEntity<Boolean> updateActiveStatus(
            @RequestParam("products") String productsJson,
            @RequestParam("active") Boolean active) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            List<Product> products = mapper.readValue(productsJson, new TypeReference<List<Product>>() {});

            if(this.productService.updateActiveStatus(products, active)) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("update-sale")
    public ResponseEntity<Boolean> updateNewStatus(
            @RequestParam("products") String productsJson,
            @RequestParam("productSale") String productSaleJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            List<Product> products = mapper.readValue(productsJson, new TypeReference<List<Product>>() {});
            ProductSale productSale = mapper.readValue(productSaleJson, ProductSale.class);

            if(this.productService.updateProductSale(products, productSale)) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("update-statuses")
    public ResponseEntity<Boolean> updateStatuses(
            @RequestParam("products") String productsJson,
            @RequestParam("new_") Boolean new_,
            @RequestParam("active") Boolean active,
            @RequestParam("top") Boolean top,
            @RequestParam("productSale") String productSaleJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            List<Product> products = mapper.readValue(productsJson, new TypeReference<List<Product>>() {});
            ProductSale productSale = mapper.readValue(productSaleJson, ProductSale.class);

            if(this.productService.updateStatuses(products, new_, top, active, productSale)) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

}
