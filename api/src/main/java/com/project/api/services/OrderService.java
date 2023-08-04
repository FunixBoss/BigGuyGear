package com.project.api.services;

import com.project.api.dtos.AccountDTO;
import com.project.api.dtos.OrderFindAllDTO;
import com.project.api.dtos.request.OrderRequestDTO;
import com.project.api.entities.Account;
import com.project.api.entities.Order;
import com.project.api.entities.OrderStatus;

import java.util.List;

public interface OrderService {
    List<OrderFindAllDTO> findAll();
    Boolean insert(OrderRequestDTO order);
    Boolean updateStatus(Order order, OrderStatus orderStatus);
    Boolean updateStatus(List<Order> orders, OrderStatus orderStatus);
}
