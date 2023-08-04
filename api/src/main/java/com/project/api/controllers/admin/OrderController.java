package com.project.api.controllers.admin;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.api.dtos.OrderFindAllDTO;
import com.project.api.dtos.request.OrderRequestDTO;
import com.project.api.entities.Order;
import com.project.api.entities.OrderStatus;
import com.project.api.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("findAll")
    public ResponseEntity<List<OrderFindAllDTO>> findAll() {
        try {
            return new ResponseEntity<>(orderService.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("create")
    public ResponseEntity<Boolean> create(@RequestBody OrderRequestDTO order) {
        try {
            return new ResponseEntity<>(orderService.insert(order), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("update-status")
    public ResponseEntity<Boolean> updateStatus(
            @RequestParam("order") String orderJson,
            @RequestParam("orderStatus") String orderStatusJson
    ) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Order order = mapper.readValue(orderJson, Order.class);
            OrderStatus orderStatus = mapper.readValue(orderStatusJson, OrderStatus.class);
            return new ResponseEntity<>(orderService.updateStatus(order, orderStatus), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("update-orders-status")
    public ResponseEntity<Boolean> updateOrdersStatus(
            @RequestParam("orders") String ordersJson,
            @RequestParam("orderStatus") String orderStatusJson
    ) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            List<Order> orders = mapper.readValue(ordersJson, new TypeReference<List<Order>>() {});
            OrderStatus orderStatus = mapper.readValue(orderStatusJson, OrderStatus.class);
            Boolean result = orderService.updateStatus(orders, orderStatus);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }


}
