import { Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseURLService } from '../base-url.service';
import { HttpClient } from '@angular/common/http';
import { ProductStyle } from '../../models/product/product-style.model';
import { ModelResponse } from '../../models/response/ModelResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductStyleService {

  // for changing when create, edit, delete => reload
  private styleChangeSubject = new Subject<void>();

  get styleChange$(): Observable<void> {
    return this.styleChangeSubject.asObservable();
  }

  notifyStyleChange(): void {
    this.styleChangeSubject.next();
  }

  constructor(
    private baseUrlService: BaseURLService,
    private httpClient: HttpClient
  ) {
  }

  findAll(): Observable<ProductStyle[] | ModelResponse> {
    const url: string = `${this.baseUrlService.baseURL}/style`
    return this.httpClient.get<ProductStyle[] | ModelResponse>(url)
  }

  insert(style: ProductStyle): Observable<ProductStyle> {
    const url: string = `${this.baseUrlService.baseURL}/style/create`
    return this.httpClient.post<ProductStyle>(url, style);
  }

  update(style: ProductStyle): Observable<ModelResponse> {
    const url: string = `${this.baseUrlService.baseURL}/style/update/${style.productStyleId}`
    return this.httpClient.post<ModelResponse>(url, style);
  }

  delete(styleId: number): Observable<ModelResponse> {
    const url: string = `${this.baseUrlService.baseURL}/style/delete/${styleId}`
    return this.httpClient.get<ModelResponse>(url);
  }
}
