import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BaseURLService } from "../base-url.service";
import { PaymentMethod } from '../../models/order/payment-method.model';

@Injectable({
    providedIn: 'root'
})
export class PaymentMethodService {
    constructor(
        private baseUrlService: BaseURLService,
        private httpClient: HttpClient
    ) { }

    findAll(): Observable<PaymentMethod[]> {
        const url: string = `${this.baseUrlService.baseURL}/findAllPayment`
        return this.httpClient.get<PaymentMethod[]>(url)
    }

    insert(paymentMethod: PaymentMethod): Observable<PaymentMethod> {
        const url: string = `${this.baseUrlService.baseURL}/payment-method/create`
        return this.httpClient.post<PaymentMethod>(url, paymentMethod);
    }

    update(paymentMethod: PaymentMethod): Observable<boolean> {
        const url: string = `${this.baseUrlService.baseURL}/payment-method/update`
        return this.httpClient.post<boolean>(url, paymentMethod);
    }

    delete(paymentMethodId: number): Observable<boolean> {
        const url: string = `${this.baseUrlService.baseURL}/payment-method/delete/${paymentMethodId}`
        return this.httpClient.get<boolean>(url);
    }
}