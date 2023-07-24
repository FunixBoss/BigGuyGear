import { Injectable } from '@angular/core';
import { ProductReview } from '../../models/product/product-review.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseURLService } from '../base-url.service';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {

  constructor(
    private baseUrlService: BaseURLService,
    private httpClient: HttpClient
  ) { }

  findAll(): Observable<ProductReview[]> {
    const url: string = `${this.baseUrlService.baseURL}/product-review`
    return this.httpClient.get<ProductReview[]>(url)
  }

  insert(productReview: ProductReview): Observable<ProductReview> {
    const url: string = `${this.baseUrlService.baseURL}/product-review/create`
    return this.httpClient.post<ProductReview>(url, productReview);
  }

  update(productReview: ProductReview): Observable<boolean> {
    const url: string = `${this.baseUrlService.baseURL}/product-review/update`
    return this.httpClient.post<boolean>(url, productReview);
  }

  delete(productReviewId: number): Observable<boolean> {    
    const url: string = `${this.baseUrlService.baseURL}/product-review/delete/${productReviewId}`
    return this.httpClient.delete<boolean>(url); 
  }
}
