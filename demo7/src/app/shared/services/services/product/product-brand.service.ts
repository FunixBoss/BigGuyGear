import { Injectable } from '@angular/core';
import { BaseURLService } from '../base-url.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { BehaviorSubject, Subject } from 'rxjs';
import { GetProductBrandResponse, ProductBrand } from '../../models/product/product-brand.model';

@Injectable({
  providedIn: 'root'
})
export class ProductBrandService {
  // change between add & edit form
  private stateSubject: BehaviorSubject<string> = new BehaviorSubject<string>('add');
  private rowDataSubject: BehaviorSubject<ProductBrand> = new BehaviorSubject<ProductBrand>(null);

  public state$: Observable<string> = this.stateSubject.asObservable();
  public rowData$: Observable<any> = this.rowDataSubject.asObservable();

  updateHandleAndRowData(state: string, rowData?: any) {
    this.stateSubject.next(state);
    if (rowData != undefined) {
      this.rowDataSubject.next(rowData as ProductBrand);
    }
  }

  // for changing when create, edit, delete => reload
  private brandChangeSubject = new Subject<void>();
  get brandChange$(): Observable<void> {
    return this.brandChangeSubject.asObservable();
  }
  notifyBrandChange(): void {
    this.brandChangeSubject.next();
  }

  constructor(
    private baseUrlService: BaseURLService,
    private httpClient: HttpClient
  ) { }

  findAll(): Observable<GetProductBrandResponse> {
    const url: string = `${this.baseUrlService.baseURL}/product-brands`
    return this.httpClient.get<GetProductBrandResponse>(url)
  }

  insert(brand: ProductBrand, uploadFile: File): Observable<boolean> {
    let formData: FormData = new FormData();
    formData.append('brand', JSON.stringify(brand));
    formData.append('imageFile', uploadFile);

    const url: string = `${this.baseUrlService.baseURL}/product-brands/create`
    return this.httpClient.post<boolean>(url, formData);
  }

  update(brand: ProductBrand, uploadFile?: File): Observable<boolean> {
    let formData: FormData = new FormData();
    formData.append('brand', JSON.stringify(brand));
    if(uploadFile != null ) {
      formData.append('imageFile', uploadFile);
    }

    const url: string = `${this.baseUrlService.baseURL}/product-brands/update`
    return this.httpClient.put<boolean>(url, formData);
  }

  delete(brandId: number): Observable<boolean> {
    const url: string = `${this.baseUrlService.baseURL}/product-brands/delete/${brandId}`
    return this.httpClient.delete<boolean>(url);
  }

  deleteBrands(brands: ProductBrand[]): Observable<boolean> {
    const url: string = `${this.baseUrlService.baseURL}/product-brands/delete-brands`
    return this.httpClient.post<boolean>(url, brands);
  }
}
