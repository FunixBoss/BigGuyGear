package com.project.api.services.impl;

import com.project.api.dtos.OrderFindAllDTO;
import com.project.api.dtos.request.OrderRequestDTO;
import com.project.api.dtos.request.ProductRequestDTO;
import com.project.api.entities.*;
import com.project.api.repositories.AddressRepository;
import com.project.api.repositories.OrderRepository;
import com.project.api.repositories.OrderStatusRepository;
import com.project.api.services.AccountService;
import com.project.api.services.AddressService;
import com.project.api.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Override
    public List<OrderFindAllDTO> findAll() {
        try {
            return orderRepository.findAll().stream()
                    .map(OrderFindAllDTO::new)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            return new ArrayList<>();
        }

    }

    @Override
    public Boolean insert(OrderRequestDTO order) {
        try {
            Order insertingOrder = new Order();
            insertingOrder.setAccountEmail(order.getAccountEmail());

            Account account = accountService.findByEmail(order.getAccountEmail());
            insertingOrder.setAccount(new Account(){{setId(account.getId());}});

//            insert address
            Address insertAddress = new Address(order.getAddress());
            if(insertAddress.getAddressId() == null) {
                insertAddress.getAccounts().add(account);
                Address insertedAddress = addressRepository.save(insertAddress);

                account.getAddresses().add(insertedAddress);
                accountService.save(account);

            }
            insertingOrder.setAddress(insertAddress.toString());

            if(order.getCoupon() != null) {
                insertingOrder.setCoupon(new Coupon(order.getCoupon()));
                insertingOrder.setCouponCode(order.getCoupon().getCode());
            }

            insertingOrder.setOrderStatus(new OrderStatus(order.getOrderStatus()));
            insertingOrder.setPaymentMethod(new PaymentMethod(order.getPaymentMethod()));
            insertingOrder.setTotalPrice(order.getTotalPrice());
            insertingOrder.setTotalQuantity(order.getTotalQuantity());

            String trackingNumber = UUID.randomUUID().toString().replace("-", "");
            insertingOrder.setOrderTrackingNumber(trackingNumber);
            insertingOrder.setCreatedAt(new Date());
            insertingOrder.setUpdatedAt(new Date());

            Set<OrderDetail> orderDetails = new HashSet<>();
            for (ProductRequestDTO product : order.getProducts()) {
                OrderDetail orderDetail = new OrderDetail();
                orderDetail.setProduct(new Product() {{setProductId(product.getProductId());}});
                orderDetail.setProductName(product.getProductName());
                orderDetail.setQuantity(product.getQuantity());
                orderDetail.setSize(product.getProductSize().getSizeName());
                orderDetail.setColor(product.getProductColor().getColorName());
                orderDetail.setPrice(product.getPrice());
                orderDetail.setOrder(insertingOrder);
                orderDetails.add(orderDetail);
            }
            insertingOrder.setOrderDetails(orderDetails);
            orderRepository.save(insertingOrder);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean updateStatus(Order order, OrderStatus orderStatus) {
        try {
            Order oldOrder = orderRepository.findById(order.getOrderId()).get();
            oldOrder.setOrderStatus(orderStatus);
            orderRepository.save(oldOrder);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean updateStatus(List<Order> orders, OrderStatus orderStatus) {
        try {
            Boolean result = true;
            for (Order order : orders) {
                if(!updateStatus(order, orderStatus)) {
                    result = false;
                    break;
                }
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
