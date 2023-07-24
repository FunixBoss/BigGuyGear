import { Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseURLService } from '../base-url.service';
import { HttpClient } from '@angular/common/http';
import { ProductShape } from '../../models/product/product-shape.model';
import { Product } from '../../models/product/product.model';
import { ModelResponse } from '../../models/response/ModelResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductShapeService {

  // for changing when create, edit, delete => reload
  private shapeChangeSubject = new Subject<void>();

  get shapeChange$(): Observable<void> {
    return this.shapeChangeSubject.asObservable();
  }

  notifyShapeChange(): void {
    this.shapeChangeSubject.next();
  }

  constructor(
    private baseUrlService: BaseURLService,
    private httpClient: HttpClient
  ) { }

  findAll(): Observable<ProductShape[] | ModelResponse> {
    const url: string = `${this.baseUrlService.baseURL}/shape`
    return this.httpClient.get<ProductShape[]  | ModelResponse>(url)
  }

  insert(shape: ProductShape): Observable<ProductShape> {
    const url: string = `${this.baseUrlService.baseURL}/shape/create`
    return this.httpClient.post<ProductShape>(url, shape);
  }

  update(shape: ProductShape): Observable<ModelResponse> {
    const url: string = `${this.baseUrlService.baseURL}/shape/update/${shape.productShapeId}`
    return this.httpClient.post<ModelResponse>(url, shape);
  }

  delete(shapeId: number): Observable<ModelResponse> {    
    const url: string = `${this.baseUrlService.baseURL}/shape/delete/${shapeId}`
    return this.httpClient.get<ModelResponse>(url); 
  }
}
