package com.project.api.dtos;

import com.project.api.entities.ProductReview;
import lombok.Data;

import java.util.Date;

@Data
public class ProductReviewDTO {
    private Integer productReviewId;
    private String imageUrl;
    private String accountEmail;
    private String content;
    private Integer rating;
    private Date createdAt;

    public ProductReviewDTO() {}

    public ProductReviewDTO(ProductReview productReview) {
        this.productReviewId = productReview.getProductReviewId();
        this.imageUrl = productReview.getAccount().getImage().getImageUrl();
        this.accountEmail = productReview.getAccount().getEmail();
        this.content = productReview.getContent();
        this.rating = productReview.getRating();
        this.createdAt = productReview.getCreatedAt();
    }
}
