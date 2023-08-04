package com.project.api.dtos;

import com.project.api.entities.Coupon;
import com.project.api.entities.Order;
import com.project.api.entities.OrderStatus;
import com.project.api.entities.PaymentMethod;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class OrderFindAllDTO {
    private Integer orderId;
    private String accountEmail;
    private String address;
    private String couponCode;
    private OrderStatusDTO orderStatus;
    private PaymentMethodDTO paymentMethod;
    private String orderTrackingNumber;
    private BigDecimal totalPrice;
    private int totalQuantity;
    private Date createdAt;


    public OrderFindAllDTO(Order order) {
        this.orderId = order.getOrderId();
        this.accountEmail = order.getAccountEmail();
        this.address = order.getAddress();
        this.couponCode = order.getCouponCode();
        this.orderStatus = new OrderStatusDTO(order.getOrderStatus());
        this.paymentMethod = new PaymentMethodDTO(order.getPaymentMethod());
        this.orderTrackingNumber = order.getOrderTrackingNumber();
        this.totalPrice = order.getTotalPrice();
        this.totalQuantity = order.getTotalQuantity();
        this.createdAt = order.getCreatedAt();
    }
}
