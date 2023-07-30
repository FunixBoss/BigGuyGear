package com.project.api.dtos;

import com.project.api.entities.*;
import lombok.Data;

import java.util.Date;

@Data
public class ProductFindAllDTO {
    private Integer productId;
    private String productName;

    private Integer categoryId;
    private String categoryName;

    private Integer productBrandId;
    private String brandName;

    private Integer productSaleId;
    private String saleName;

    private Integer productStyleId;
    private String styleName;

    private String imageUrl;

    private Boolean active;
    private Boolean sale;
    private Boolean top;
    private Boolean new_;
    private Date createdAt;
    private Date updatedAt;
    private Integer totalSold;
    private Integer totalLikes;
    private Integer totalRating;
    private Double avgRating;

    public ProductFindAllDTO(Integer productId, String productName, Integer categoryId, String categoryName,
                             Integer productBrandId, String brandName, Integer productSaleId, String saleName,
                             Integer productStyleId, String styleName,  Boolean active, Boolean sale,
                             Boolean top, Boolean new_, Date createdAt, Date updatedAt) {
        this.productId = productId;
        this.productName = productName;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.productBrandId = productBrandId;
        this.brandName = brandName;
        this.productSaleId = productSaleId;
        this.saleName = saleName;
        this.productStyleId = productStyleId;
        this.styleName = styleName;
        this.active = active;
        this.sale = sale;
        this.top = top;
        this.new_ = new_;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
