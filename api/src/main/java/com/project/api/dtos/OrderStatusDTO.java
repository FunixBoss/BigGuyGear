package com.project.api.dtos;

import com.project.api.entities.OrderStatus;
import lombok.Data;

@Data
public class OrderStatusDTO {
    private Integer orderStatusId;
    private String statusName;
    private String description;

    public OrderStatusDTO() {}
    public OrderStatusDTO(OrderStatus orderStatus) {
        this.orderStatusId = orderStatus.getOrderStatusId();
        this.statusName = orderStatus.getStatusName();
        this.description = orderStatus.getDescription();
    }
}
