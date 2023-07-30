package com.project.api.dtos;

import com.project.api.entities.Category;
import com.project.api.entities.Product;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ProductDetailDTO {
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

    private String description;
    private List<String> imageUrls;
    private List<ProductVariantDTO> productVariants;
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

    public ProductDetailDTO(Integer productId, String productName, Integer categoryId, String categoryName,
                            Integer productBrandId, String brandName, Integer productSaleId, String saleName,
                            Integer productStyleId, String styleName, Boolean active, Boolean sale,
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

    public ProductDetailDTO(Product product) {
        this.productId = product.getProductId();
        this.productName = product.getProductName();

        if(product.getCategory() != null ) {
            this.categoryId = product.getCategory().getCategoryId();
            this.categoryName = product.getCategory().getCategoryName();
        }

        if(product.getProductBrand() != null) {
            this.productBrandId = product.getProductBrand().getProductBrandId();
            this.brandName = product.getProductBrand().getBrandName();
        }

        if(product.getProductSale() != null) {
            this.productSaleId = product.getProductSale().getProductSaleId();
            this.saleName = product.getProductSale().getSaleName();
        }

        if(product.getProductStyle() != null) {
            this.productStyleId = product.getProductStyle().getProductStyleId();
            this.styleName = product.getProductStyle().getStyleName();
        }
        this.productVariants = product.getProductVariants().stream()
                .map(ProductVariantDTO::new)
                .collect(Collectors.toList());;
        this.description = product.getDescription();
        this.active = product.getActive();
        this.sale = product.getSale();
        this.top = product.getTop();
        this.new_ = product.getNew_();
        this.createdAt = product.getCreatedAt();
        this.updatedAt = product.getUpdatedAt();

    }
}
