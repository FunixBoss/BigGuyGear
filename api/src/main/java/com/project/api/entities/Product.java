package com.project.api.entities;
// Generated Jul 25, 2023, 8:08:56 PM by Hibernate Tools 4.3.6.Final

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Product generated by hbm2java
 */

@Data
@Entity
@Table(name = "Product")
public class Product implements Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "product_id", unique = true, nullable = false)
	private Integer productId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category category;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_brand_id")
	private ProductBrand productBrand;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_sale_id")
	private ProductSale productSale;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_style_id")
	private ProductStyle productStyle;

	@Column(name = "product_name", nullable = false)
	private String productName;

	@Column(name = "description")
	private String description;

	@Column(name = "active")
	private Boolean active;

	@Column(name = "sale")
	private Boolean sale;

	@Column(name = "[top]")
	private Boolean top;

	@Column(name = "new")
	private Boolean new_;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at", length = 23)
	private Date createdAt;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at", length = 23)
	private Date updatedAt;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
	private Set<ProductVariant> productVariants = new HashSet<ProductVariant>(0);

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
	private Set<CartDetail> cartDetails = new HashSet<CartDetail>(0);
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
	private Set<OrderDetail> orderDetails = new HashSet<OrderDetail>(0);

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "ProductImage", joinColumns = {
			@JoinColumn(name = "product_id", nullable = false, updatable = false) }, inverseJoinColumns = {
			@JoinColumn(name = "image_id", nullable = false, updatable = false) })
	private Set<Image> images = new HashSet<Image>(0);

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
	private Set<ProductReview> productReviews = new HashSet<ProductReview>(0);

	public Product() {
	}

	public Product(String productName, Date createdAt, Date updatedAt) {
		this.productName = productName;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Product(Category category, ProductBrand productBrand, ProductSale productSale, ProductStyle productStyle,
			String productName, String description, Boolean active, Boolean sale, Boolean top, Boolean new_,
			Date createdAt, Date updatedAt, Set<ProductVariant> productVariants, Set<CartDetail> cartDetails,
			Set<OrderDetail> orderDetails, Set<Image> images, Set<ProductReview> productReviews) {
		this.category = category;
		this.productBrand = productBrand;
		this.productSale = productSale;
		this.productStyle = productStyle;
		this.productName = productName;
		this.description = description;
		this.active = active;
		this.sale = sale;
		this.top = top;
		this.new_ = new_;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.productVariants = productVariants;
		this.cartDetails = cartDetails;
		this.orderDetails = orderDetails;
		this.images = images;
		this.productReviews = productReviews;
	}

}