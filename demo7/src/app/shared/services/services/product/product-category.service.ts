import { Injectable } from '@angular/core';
import { BaseURLService } from '../base-url.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { GetCategoryResponse, ProductCategory } from '../../models/product/product-category.model';
import { of, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  // change between add & edit form
  private stateSubject: BehaviorSubject<string> = new BehaviorSubject<string>('add');
  private rowDataSubject: BehaviorSubject<ProductCategory> = new BehaviorSubject<ProductCategory>(null);

  public state$: Observable<string> = this.stateSubject.asObservable();
  public rowData$: Observable<any> = this.rowDataSubject.asObservable();

  updateHandleAndRowData(state: string, rowData?: any) {
    this.stateSubject.next(state);
    if (rowData != undefined) {
      this.rowDataSubject.next(rowData as ProductCategory);
    }
  }

  // for changing when create, edit, delete => reload
  private categoryChangeSubject = new Subject<void>();
  get categoryChange$(): Observable<void> {
    return this.categoryChangeSubject.asObservable();
  }
  notifyCategoryChange(): void {
    this.categoryChangeSubject.next();
  }

  constructor(
    private baseUrlService: BaseURLService,
    private httpClient: HttpClient
  ) { }

  findAll(): Observable<GetCategoryResponse> {
    const url: string = `${this.baseUrlService.baseURL}/categories`
    return this.httpClient.get<GetCategoryResponse>(url)
  }

  insert(category: ProductCategory, uploadFile: File): Observable<boolean> {
    let formData: FormData = new FormData();
    formData.append('category', JSON.stringify(category));
    formData.append('imageFile', uploadFile);


    const url: string = `${this.baseUrlService.baseURL}/categories/create`
    return this.httpClient.post<boolean>(url, formData);
  }

  update(category: ProductCategory, uploadFile?: File): Observable<boolean> {
    let formData: FormData = new FormData();
    formData.append('category', JSON.stringify(category));
    if(uploadFile != null ) {
      formData.append('imageFile', uploadFile);
    }

    const url: string = `${this.baseUrlService.baseURL}/categories/update`
    return this.httpClient.put<boolean>(url, formData);
  }

  delete(categoryId: number): Observable<boolean> {
    const url: string = `${this.baseUrlService.baseURL}/categories/delete/${categoryId}`
    return this.httpClient.delete<boolean>(url);
  }

  deleteCategories(categories: ProductCategory[]): Observable<boolean> {
    const url: string = `${this.baseUrlService.baseURL}/categories/delete-categories`
    return this.httpClient.post<boolean>(url, categories);
  }
}
