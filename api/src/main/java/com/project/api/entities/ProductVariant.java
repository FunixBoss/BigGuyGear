package com.project.api.entities;
// Generated Jul 25, 2023, 8:08:56 PM by Hibernate Tools 4.3.6.Final

import lombok.Data;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * ProductVariant generated by hbm2java
 */

@Data
@Entity
@Table(name = "ProductVariant")
public class ProductVariant implements java.io.Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "product_variant_id", unique = true, nullable = false)
	private Integer productVariantId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "image_id")
	private Image image;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "color_id", nullable = false)
	private ProductColor productColor;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "size_id", nullable = false)
	private ProductSize productSize;

	@Column(name = "quantity", nullable = false)
	private int quantity;

	@Column(name = "price", nullable = false, precision = 18)
	private BigDecimal price;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "productVariant")
	private Set<CartDetail> cartDetails = new HashSet<CartDetail>(0);

	public ProductVariant() {
	}

	public ProductVariant(Product product, ProductColor productColor, ProductSize productSize, int quantity,
			BigDecimal price) {
		this.product = product;
		this.productColor = productColor;
		this.productSize = productSize;
		this.quantity = quantity;
		this.price = price;
	}

	public ProductVariant(Image image, Product product, ProductColor productColor, ProductSize productSize, int quantity,
			BigDecimal price, Set<CartDetail> cartDetails) {
		this.image = image;
		this.product = product;
		this.productSize = productSize;
		this.productColor = productColor;
		this.quantity = quantity;
		this.price = price;
		this.cartDetails = cartDetails;
	}

}
