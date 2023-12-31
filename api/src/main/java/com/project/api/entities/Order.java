package com.project.api.entities;
// Generated Jul 25, 2023, 8:08:56 PM by Hibernate Tools 4.3.6.Final

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * Order generated by hbm2java
 */

@Data
@Entity
@Table(name = "[Order]")
public class Order implements Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "order_id", unique = true, nullable = false)
	private Integer orderId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "account_id")
	private Account account;

	@Column(name = "account_email")
	private String accountEmail;

	@Column(name = "address")
	private String address;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "coupon_id")
	private Coupon coupon;

	@Column(name = "coupon_code")
	private String couponCode;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_status_id", nullable = false)
	private OrderStatus orderStatus;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "payment_method_id", nullable = false)
	private PaymentMethod paymentMethod;

	@Column(name = "order_tracking_number")
	private String orderTrackingNumber;

	@Column(name = "total_price", nullable = false, precision = 18)
	private BigDecimal totalPrice;

	@Column(name = "total_quantity", nullable = false)
	private int totalQuantity;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at", length = 23)
	private Date createdAt;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at", length = 23)
	private Date updatedAt;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "order", cascade = CascadeType.ALL)
	private Set<OrderDetail> orderDetails = new HashSet<OrderDetail>(0);

	public Order() {
	}

	public Order(Account account, String address, OrderStatus orderStatus, PaymentMethod paymentMethod,
			BigDecimal totalPrice, int totalQuantity, Date createdAt, Date updatedAt) {
		this.account = account;
		this.address = address;
		this.orderStatus = orderStatus;
		this.paymentMethod = paymentMethod;
		this.totalPrice = totalPrice;
		this.totalQuantity = totalQuantity;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Order(Account account, String address, Coupon coupon, OrderStatus orderStatus, PaymentMethod paymentMethod,
			String orderTrackingNumber, BigDecimal totalPrice, int totalQuantity, Date createdAt, Date updatedAt,
			Set<OrderDetail> orderDetails) {
		this.account = account;
		this.address = address;
		this.coupon = coupon;
		this.orderStatus = orderStatus;
		this.paymentMethod = paymentMethod;
		this.orderTrackingNumber = orderTrackingNumber;
		this.totalPrice = totalPrice;
		this.totalQuantity = totalQuantity;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.orderDetails = orderDetails;
	}

	@Override
	public int hashCode() {
		return Objects.hash(orderId);
	}
}
