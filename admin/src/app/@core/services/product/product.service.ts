import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Product, ProductDetailDTO, ProductFindAllDTO } from '../../models/product/product.model';
import { BaseURLService } from '../base-url.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ProductSale } from '../../models/sale/product-sale.model';

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

  findByNameKeyword(productName: string): Observable<Product[]> {
    const url: string = `${this.baseUrlService.baseURL}/productByIdOrName/${productName}`
    return this.httpClient.get<Product[]>(url);
  }

  findAll(): Observable<ProductFindAllDTO[]> {
    const url = `${this.baseUrlService.baseURL}/products/findAll`
    return this.httpClient.get<ProductFindAllDTO[]>(url);
  }

  findById(id: number): Observable<ProductDetailDTO> {
    const url: string = `${this.baseUrlService.baseURL}/products/${id}`
    return this.httpClient.get<ProductDetailDTO>(url);
  }

  findDetailById(id: number): Observable<Product> {
    const url: string = `${this.baseUrlService.baseURL}/product/detail/${id}`
    return this.httpClient.get<Product>(url);
  }

  insert(product: Product): Observable<boolean> {
    const url: string = `${this.baseUrlService.baseURL}/products`
    return this.httpClient.post<boolean>(url, product);
  }

  update(product: Product): Observable<boolean> {
    const url: string = `${this.baseUrlService.baseURL}/products/update`
    return this.httpClient.post<boolean>(url, product);
  }

  updateStatusNew(products: Product[], new_: boolean): Observable<boolean> {
    const mappedProducts = products.map(pro => {
      return {
        productId: pro.productId
      }
    })
    let formData = new FormData()
    formData.append("products", JSON.stringify(mappedProducts));
    formData.append("new_", new_.toString());

    const url: string = `${this.baseUrlService.baseURL}/products/update-new-status`
    return this.httpClient.post<boolean>(url, formData);
  }

  updateStatusTop(products: Product[], top: boolean): Observable<boolean> {
    const mappedProducts = products.map(pro => {
      return {
        productId: pro.productId
      }
    })
    let formData = new FormData()
    formData.append("products", JSON.stringify(mappedProducts));
    formData.append("top", top.toString());

    const url: string = `${this.baseUrlService.baseURL}/products/update-top-status`
    return this.httpClient.post<boolean>(url, formData);
  }

  updateStatusActive(products: Product[], active: boolean): Observable<boolean> {
    const mappedProducts = products.map(pro => {
      return {
        productId: pro.productId
      }
    })
    let formData = new FormData()
    formData.append("products", JSON.stringify(mappedProducts));
    formData.append("active", active.toString());

    const url: string = `${this.baseUrlService.baseURL}/products/update-active-status`
    return this.httpClient.post<boolean>(url, formData);
  }



  appliedProductSale(products: Product[], sale: ProductSale): Observable<boolean> {
    const mappedProducts = products.map(pro => {
      return {
        productId: pro.productId
      }
    })
    const mappedSale = sale != null
      ? { productSaleId: sale.productSaleId }
      : null
    let formData = new FormData()
    formData.append("products", JSON.stringify(mappedProducts));
    formData.append("productSale", JSON.stringify(mappedSale));

    const url: string = `${this.baseUrlService.baseURL}/products/update-sale`
    return this.httpClient.post<boolean>(url, formData);
  }

  updateStatuses(products: Product[], new_: boolean, top: boolean,
    active: boolean, sale: ProductSale): Observable<boolean> {
    const mappedProducts = products.map(pro => {
      return {
        productId: pro.productId
      }
    })
    const mappedSale = sale != null
      ? { productSaleId: sale.productSaleId }
      : null
    let formData = new FormData()
    formData.append("products", JSON.stringify(mappedProducts));
    formData.append("new_", new_.toString());
    formData.append("top", top.toString());
    formData.append("active", active.toString());
    formData.append("productSale", JSON.stringify(mappedSale));

    const url: string = `${this.baseUrlService.baseURL}/products/update-statuses`
    return this.httpClient.post<boolean>(url, formData);
  }

  deleteProducts(products: Product[]): Observable<boolean> {
    let mappedProducts = products.map(pro => {
      return {
        productId: pro.productId
      }
    })
    const url: string = `${this.baseUrlService.baseURL}/products/delete-products`
    return this.httpClient.post<boolean>(url, mappedProducts);
  }

  delete(productId: number): Observable<boolean> {
    const url: string = `${this.baseUrlService.baseURL}/products/${productId}`
    return this.httpClient.delete<boolean>(url);
  } 

  getDetails(productId: number): Observable<Product> {
    const url: string = `${this.baseUrlService.baseURL}/product/details1/${productId}`;
    return this.httpClient.get<Product>(url)
  }
}
