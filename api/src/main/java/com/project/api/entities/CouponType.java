package com.project.api.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * CouponType generated by hbm2java
 */

@Data
@Entity
@Table(name = "CouponType")
public class CouponType implements java.io.Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "coupon_type_id", unique = true, nullable = false)
	private Integer couponTypeId;

	@Column(name="type_name", nullable=false)
	private String typeName;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "couponType")
	private Set<Coupon> coupons = new HashSet<Coupon>(0);

	public CouponType() {
	}

	public CouponType(String typeName) {
        this.typeName = typeName;
    }

	public CouponType(String typeName, Set<Coupon> coupons) {
       this.typeName = typeName;
       this.coupons = coupons;
    }

}