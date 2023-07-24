import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product/product.model';
import { BaseURLService } from '../base-url.service';
import { HttpClient } from '@angular/common/http';
import { ModelResponse } from '../../models/response/ModelResponse';
import { Subject } from 'rxjs';

export class ToastState {
  bahavior: String;
  model: string;
  status: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productChangeSubject = new Subject<void>();

  // Getter for the subject as an observable
  get productChange$(): Observable<void> {
    return this.productChangeSubject.asObservable();
  }

  // Call this method whenever a change occurs in the product list
  notifyProductChange(): void {
    this.productChangeSubject.next();
  }

  constructor(
    private baseUrlService: BaseURLService,
    private httpClient: HttpClient
  ) { }

  findByNameKeyword(productName: string): Observable<Product[]>  {
    const url: string = `${this.baseUrlService.baseURL}/productByIdOrName/${productName}`
    return this.httpClient.get<Product[]>(url);
  }

  findAll(): Observable<Product[] | ModelResponse> {
    const url = `${this.baseUrlService.baseURL}/product`
    return this.httpClient.get<Product[] | ModelResponse>(url);
  }
  
  findById(id: number): Observable<Product | ModelResponse>  {
    const url: string = `${this.baseUrlService.baseURL}/product/edit/${id}`
    return this.httpClient.get<Product>(url);
  } 

  findDetailById(id: number): Observable<Product | ModelResponse>  {
    const url: string = `${this.baseUrlService.baseURL}/product/detail/${id}`
    return this.httpClient.get<Product>(url);
  } 

  insert(product: Product): Observable<Product> {
    const url: string = `${this.baseUrlService.baseURL}/product/create`
    return this.httpClient.post<Product>(url, product);
  }

  update(product: Product): Observable<ModelResponse> {
    const url: string = `${this.baseUrlService.baseURL}/product/update/${product.productId}`
    return this.httpClient.post<ModelResponse>(url, product);
  }

  delete(productId: number): Observable<ModelResponse> {    
    const url: string = `${this.baseUrlService.baseURL}/product/delete/${productId}`
    return this.httpClient.get<ModelResponse>(url); 
  }

  hideProduct(productId: number): Observable<ModelResponse> {
    const url: string = `${this.baseUrlService.baseURL}/product/hide/${productId}`
    return this.httpClient.get<ModelResponse>(url); 
  }

  getDetails(productId: number): Observable<Product | ModelResponse> {
    const url: string = `${this.baseUrlService.baseURL}/product/details1/${productId}`;
    return this.httpClient.get<ModelResponse >(url)
  }
}
