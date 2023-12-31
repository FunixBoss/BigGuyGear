package com.project.api.dtos;

import com.project.api.entities.Order;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
public class OrderFindDetailDTO {
    private Integer orderId;
    private String orderTrackingNumber;
    private String accountEmail;
    private String address;
    private String couponCode;
    private OrderStatusDTO orderStatus;
    private PaymentMethodDTO paymentMethod;
    private BigDecimal totalPrice;
    private int totalQuantity;
    private Date createdAt;
    private List<OrderDetailDTO> orderDetails;


    public OrderFindDetailDTO(Order order) {
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
