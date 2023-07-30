package com.project.api.services;


import com.project.api.dtos.ProductDetailDTO;
import com.project.api.dtos.ProductFindAllDTO;
import com.project.api.entities.Product;
import com.project.api.entities.ProductSale;

import java.util.List;

public interface ProductService {

    ProductDetailDTO findById(Integer productId);
    List<ProductFindAllDTO> findAllDTO();
    Product save(Product product);

    Product update(Product product);
    Boolean updateNewStatus(List<Product> products, boolean new_);
    Boolean updateTopStatus(List<Product> products, boolean top);
    Boolean updateActiveStatus(List<Product> products, boolean active);
    Boolean updateProductSale(List<Product> products, ProductSale productSale);
    Boolean updateStatuses(List<Product> products, boolean new_, boolean top, boolean active, ProductSale productSale);
    Boolean delete(Integer productId);
    Boolean delete(List<Product> products);

}
