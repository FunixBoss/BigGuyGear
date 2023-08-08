import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseURLService } from '../base-url.service';
import { HttpClient } from '@angular/common/http';
import { GetProductStyleResponse, ProductStyle } from '../../models/product/product-style.model';

@Injectable({
  providedIn: 'root'
})
export class ProductStyleService {

  private stateSubject: BehaviorSubject<string> = new BehaviorSubject<string>('add');
  private rowDataSubject: BehaviorSubject<ProductStyle> = new BehaviorSubject<ProductStyle>(null);

  public state$: Observable<string> = this.stateSubject.asObservable();
  public rowData$: Observable<any> = this.rowDataSubject.asObservable();

  updateHandleAndRowData(state: string, rowData?: any) {
    this.stateSubject.next(state);
    if (rowData != undefined) {
      this.rowDataSubject.next(rowData as ProductStyle);
    }
  }

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

  findAll(): Observable<GetProductStyleResponse> {
    const url: string = `${this.baseUrlService.baseURL}/product-styles`
    return this.httpClient.get<GetProductStyleResponse>(url)
  }

  insert(style: ProductStyle): Observable<ProductStyle> {
    const url: string = `${this.baseUrlService.baseURL}/product-styles`
    return this.httpClient.post<ProductStyle>(url, style);
  }

  update(style: ProductStyle): Observable<boolean> {
    const url: string = `${this.baseUrlService.baseURL}/product-styles`
    return this.httpClient.post<boolean>(url, style);
  }

  delete(styleId: number): Observable<void> {
    const url: string = `${this.baseUrlService.baseURL}/product-styles/${styleId}`
    return this.httpClient.delete<void>(url);
  }

  deleteStyles(styles: ProductStyle[]): Observable<void> {
    const mappedStyles = styles.map(style => {
      return {
        productStyleId: style.productStyleId
      }
    })

    const url: string = `${this.baseUrlService.baseURL}/product-styles/delete-styles`
    return this.httpClient.post<void>(url, mappedStyles);
  }
}
