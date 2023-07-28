package com.project.api.entities;
// Generated Jul 25, 2023, 8:08:56 PM by Hibernate Tools 4.3.6.Final

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * ProductColor generated by hbm2java
 */

@Data
@Entity
@Table(name = "ProductSize")
public class ProductSize implements Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "product_size_id", unique = true, nullable = false)
	private Integer productSizeId;

	@Column(name = "size_name")
	private String sizeName;

	@Column(name = "size_type")
	private String sizeType;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "productSize")
	private Set<ProductVariant> productVariants = new HashSet<ProductVariant>(0);

	public ProductSize() {
	}

	public ProductSize(String sizeName, String sizeType) {
		this.sizeName  = sizeName;
		this.sizeType = sizeType;
	}

	public ProductSize(String sizeName, String sizeType, Set<ProductVariant> productVariants) {
		this.sizeName  = sizeName;
		this.sizeType = sizeType;
		this.productVariants = productVariants;
	}

}
