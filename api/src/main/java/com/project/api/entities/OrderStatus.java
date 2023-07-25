package com.project.api.entities;
// Generated Jul 25, 2023, 8:08:56 PM by Hibernate Tools 4.3.6.Final

import lombok.Data;

import java.io.Serializable;
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
 * OrderStatus generated by hbm2java
 */

@Data
@Entity
@Table(name = "OrderStatus")
public class OrderStatus implements Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "order_status_id", unique = true, nullable = false)
	private Integer orderStatusId;

	@Column(name = "status_name", nullable = false)
	private String statusName;

	@Column(name = "description", nullable = false)
	private String description;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "orderStatus")
	private Set<Order> orders = new HashSet<Order>(0);

	public OrderStatus() {
	}

	public OrderStatus(String statusName, String description) {
		this.statusName = statusName;
		this.description = description;
	}

	public OrderStatus(String statusName, String description, Set<Order> orders) {
		this.statusName = statusName;
		this.description = description;
		this.orders = orders;
	}
}
