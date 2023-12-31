package com.project.api.entities;
// Generated Jul 25, 2023, 8:08:56 PM by Hibernate Tools 4.3.6.Final

import lombok.Data;

import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * Account generated by hbm2java
 */
@Data
@Entity
@Table(name = "Account")
public class Account implements java.io.Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "image_id")
	private Image image;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "role_id", nullable = false)
	private Role role;

	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "full_name", nullable = false)
	private String fullName;

	@Column(name = "email", unique = true, nullable = false)
	private String email;

	@Column(name = "phone_number", nullable = false)
	private String phoneNumber;

	@Column(name = "active")
	private Boolean active;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at", length = 23)
	private Date createdAt;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at", length = 23)
	private Date updatedAt;

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "accounts", cascade = CascadeType.ALL)
	private Set<Address> addresses = new HashSet<Address>(0);

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "wishlists", cascade = CascadeType.ALL)
	private Set<Product> wishlists = new HashSet<Product>(0);

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "account", cascade = CascadeType.ALL)
	private Set<ProductReview> productReviews = new HashSet<ProductReview>(0);

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "account")
	private Set<Order> orders = new HashSet<Order>(0);

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "account", cascade = CascadeType.ALL)
	private Set<Notification> notifications = new HashSet<Notification>(0);

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "account", cascade = CascadeType.ALL)
	private Set<Cart> carts = new HashSet<Cart>(0);

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "account", cascade = CascadeType.ALL)
	private Set<AccountCoupon> accountCoupons = new HashSet<AccountCoupon>(0);

	public Account() {
	}

	public Account(Role role, String password, String fullName, String email,
			String phoneNumber, Date createdAt, Date updatedAt) {
		this.role = role;
		this.password = password;
		this.fullName = fullName;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Account(Image image, Role role, String password, String fullName, String email,
			String phoneNumber, Date createdAt, Date updatedAt, Set<Address> addresses,
			Set<ProductReview> productReviews, Set<Order> orders, Set<Notification> notifications, Set<Cart> carts,
			Set<AccountCoupon> accountCoupons) {
		this.image = image;
		this.role = role;
		this.password = password;
		this.fullName = fullName;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.addresses = addresses;
		this.productReviews = productReviews;
		this.orders = orders;
		this.notifications = notifications;
		this.carts = carts;
		this.accountCoupons = accountCoupons;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
}
