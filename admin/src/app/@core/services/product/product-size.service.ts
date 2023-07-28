import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseURLService } from '../base-url.service';
import { HttpClient } from '@angular/common/http';
import { ProductStyle } from '../../models/product/product-style.model';
import { GetProductSizeResponse } from '../../models/product/product-size.model';

@Injectable({
  providedIn: 'root'
})
export class ProductSizeService {

  constructor(
    private baseUrlService: BaseURLService,
    private httpClient: HttpClient
  ) {
  }

  findAll(): Observable<GetProductSizeResponse> {
    const url: string = `${this.baseUrlService.baseURL}/product-sizes`
    return this.httpClient.get<GetProductSizeResponse>(url)
  }

  insert(style: ProductStyle): Observable<ProductStyle> {
    const url: string = `${this.baseUrlService.baseURL}//product-sizes`
    return this.httpClient.post<ProductStyle>(url, style);
  }

  update(style: ProductStyle): Observable<boolean> {
    const url: string = `${this.baseUrlService.baseURL}//product-sizes`
    return this.httpClient.post<boolean>(url, style);
  }

  delete(sizeId: number): Observable<void> {
    const url: string = `${this.baseUrlService.baseURL}//product-sizes/${sizeId}`
    return this.httpClient.delete<void>(url);
  }

}
