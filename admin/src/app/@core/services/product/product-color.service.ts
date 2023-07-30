import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseURLService } from '../base-url.service';
import { HttpClient } from '@angular/common/http';
import { GetColorResponse, ProductColor } from '../../models/product/product-color.model';

@Injectable({
  providedIn: 'root'
})
export class ProductColorService {

  constructor(
    private baseUrlService: BaseURLService,
    private httpClient: HttpClient
  ) { }

  findAllBasic(): Observable<GetColorResponse> {
    const url: string = `${this.baseUrlService.baseURL}/product-colors/search/findByColorType?colorType=basic`
    return this.httpClient.get<GetColorResponse>(url)
  }

  findAll(): Observable<GetColorResponse> {
    const url: string = `${this.baseUrlService.baseURL}/product-colors`
    return this.httpClient.get<GetColorResponse>(url)
  }

  insert(color: ProductColor): Observable<ProductColor> {
    const url: string = `${this.baseUrlService.baseURL}/product-colors`
    return this.httpClient.post<ProductColor>(url, color);
  }

  update(color: ProductColor): Observable<boolean> {
    const url: string = `${this.baseUrlService.baseURL}/product-colors`
    return this.httpClient.post<boolean>(url, color);
  }

  delete(colorId: number): Observable<boolean> {    
    const url: string = `${this.baseUrlService.baseURL}/product-colors/delete/${colorId}`
    return this.httpClient.delete<boolean>(url); 
  }
}
