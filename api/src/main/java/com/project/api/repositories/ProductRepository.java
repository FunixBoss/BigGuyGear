package com.project.api.repositories;

import com.project.api.dtos.ProductDetailDTO;
import com.project.api.dtos.ProductFindAllDTO;
import com.project.api.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "products", path="products")
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT NEW com.project.api.dtos.ProductFindAllDTO(" +
            "p.productId, " +
            "p.productName, " +
            "c.categoryId, " +
            "c.categoryName, " +
            "b.productBrandId, " +
            "b.brandName, " +
            "s.productSaleId, " +
            "s.saleName, " +
            "ps.productStyleId, " +
            "ps.styleName, " +
            "p.active, " +
            "p.sale, " +
            "p.top, " +
            "p.new_, " +
            "p.createdAt, " +
            "p.updatedAt) " +
            "FROM Product p " +
            "LEFT JOIN p.category c " +
            "LEFT JOIN p.productBrand b " +
            "LEFT JOIN p.productSale s " +
            "LEFT JOIN p.productStyle ps")
    List<ProductFindAllDTO> findAllDTO();

    @Query("SELECT NEW com.project.api.dtos.ProductDetailDTO(" +
            "p.productId, " +
            "p.productName, " +
            "c.categoryId, " +
            "c.categoryName, " +
            "b.productBrandId, " +
            "b.brandName, " +
            "s.productSaleId, " +
            "s.saleName, " +
            "ps.productStyleId, " +
            "ps.styleName, " +
            "p.active, " +
            "p.sale, " +
            "p.top, " +
            "p.new_, " +
            "p.createdAt, " +
            "p.updatedAt) " +
            "FROM Product p " +
            "LEFT JOIN p.category c " +
            "LEFT JOIN p.productBrand b " +
            "LEFT JOIN p.productSale s " +
            "LEFT JOIN p.productStyle ps " +
            "WHERE p.productId = :productId"
    )
    ProductDetailDTO findDetailByIdDTO(@Param("productId") Integer productId);

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
}