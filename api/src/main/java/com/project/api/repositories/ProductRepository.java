package com.project.api.repositories;

import com.project.api.dtos.ProductDetailDTO;
import com.project.api.dtos.ProductFindAllDTO;
import com.project.api.entities.Product;
import com.project.api.entities.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "products", path="products")
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT img.imageUrl FROM Product p JOIN p.images img WHERE p.productId = :productId")
    List<String> getImageUrls(@Param("productId") Integer productId);
    @Query("SELECT COUNT(w) FROM Product p JOIN p.wishlists w WHERE p.productId = :productId")
    Integer countTotalLikes(@Param("productId") Integer productId);

    @Query("SELECT COUNT(o) FROM Product p JOIN p.orderDetails o WHERE p.productId = :productId")
    Integer countTotalSold(@Param("productId") Integer productId);

    @Query("SELECT COUNT(pr) FROM Product p JOIN p.productReviews pr WHERE p.productId = :productId")
    Integer countTotalRating(@Param("productId") Integer productId);

    @Query("SELECT COALESCE(AVG(pr.rating), 0) FROM Product p LEFT JOIN p.productReviews pr WHERE p.productId = :productId")
    Double countAvgRating(@Param("productId") Integer productId);

    List<Product> findByProductNameStartingWith(String keyword);
    @Query("SELECT COUNT(pr) FROM Product p JOIN p.productReviews pr WHERE p.productId = :productId")
    Integer countProductReviewsByProductId(Integer productId);

}