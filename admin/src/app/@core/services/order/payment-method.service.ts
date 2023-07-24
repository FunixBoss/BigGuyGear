import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BaseURLService } from "../base-url.service";
import { PaymentMethod } from '../../models/order/payment-method.model';
import { ModelResponse } from '../../models/response/ModelResponse';

@Injectable({
    providedIn: 'root'
})
export class PaymentMethodService {
    constructor(
        private baseUrlService: BaseURLService,
        private httpClient: HttpClient
    ) { }


    // findAll(): Observable<PaymentMethod[]> {
    //     return of([
    //         {
    //             paymentMethodId: 1,
    //             paymentMethodName: 'Paypal',
    //         },
    //         {
    //             paymentMethodId: 2,
    //             paymentMethodName: 'Vnpay',
    //         },
    //     ])
    // }

    // findById(id: number): Observable<PaymentMethod> {
    //     let pm: PaymentMethod
    //     this.findAll().subscribe(
    //         data => {
    //             pm = data.find(p => p.paymentMethodId == id)
    //         }
    //     )
    //     return of(pm)
    // }

    findAll(): Observable<PaymentMethod[]> {
        const url: string = `${this.baseUrlService.baseURL}/findAllPayment`
        return this.httpClient.get<PaymentMethod[]>(url)
    }

    insert(paymentMethod: PaymentMethod): Observable<PaymentMethod> {
        const url: string = `${this.baseUrlService.baseURL}/payment-method/create`
        return this.httpClient.post<PaymentMethod>(url, paymentMethod);
    }

    update(paymentMethod: PaymentMethod): Observable<ModelResponse> {
        const url: string = `${this.baseUrlService.baseURL}/payment-method/update`
        return this.httpClient.post<ModelResponse>(url, paymentMethod);
    }

    delete(paymentMethodId: number): Observable<ModelResponse> {
        const url: string = `${this.baseUrlService.baseURL}/payment-method/delete/${paymentMethodId}`
        return this.httpClient.get<ModelResponse>(url);
    }
}