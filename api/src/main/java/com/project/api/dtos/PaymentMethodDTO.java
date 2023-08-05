package com.project.api.dtos;

import com.project.api.entities.PaymentMethod;
import lombok.Data;

@Data
public class PaymentMethodDTO {
    private Integer paymentMethodId;
    private String methodName;

    public  PaymentMethodDTO() {}
    public PaymentMethodDTO(PaymentMethod paymentMethod) {
        this.paymentMethodId = paymentMethod.getPaymentMethodId();
        this.methodName = paymentMethod.getMethodName();
    }
}
