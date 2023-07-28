import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BaseURLService } from "../base-url.service";
import { OrderStatus } from '../../models/order/order-status.model';

@Injectable({
    providedIn: 'root'
})
export class OrderStatusService {
    constructor(
        private baseUrlService: BaseURLService,
        private httpClient: HttpClient
    ) { }


    findById(id: number): Observable<OrderStatus> {
        let os: OrderStatus
        this.findAll().subscribe(
            data => {
                os = data.find(status => status.orderStatusId == id)
            }
        )
        return of(os)
    }

    findAll(): Observable<OrderStatus[]> {
        const url: string = `${this.baseUrlService.baseURL}/findAllStatus`
        return this.httpClient.get<OrderStatus[]>(url)
    }

    insert(orderStatus: OrderStatus): Observable<OrderStatus> {
        const url: string = `${this.baseUrlService.baseURL}/order-status/create`
        return this.httpClient.post<OrderStatus>(url, orderStatus);
    }

    update(orderStatus: OrderStatus): Observable<boolean> {
        const url: string = `${this.baseUrlService.baseURL}/order-status/update`
        return this.httpClient.post<boolean>(url, orderStatus);
    }

    delete(orderStatusId: number): Observable<boolean> {
        const url: string = `${this.baseUrlService.baseURL}/order-status/delete/${orderStatusId}`
        return this.httpClient.get<boolean>(url);
    }
}