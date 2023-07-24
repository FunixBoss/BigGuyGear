import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Order } from '../../models/order/order.model';
import { BaseURLService } from '../base-url.service';
import { HttpClient } from '@angular/common/http';
import { Account } from '../../models/account/account.model';
import { OrderService } from '../order/order.service';
import { Address } from '../../models/address/address.model';
import { Province } from '../../models/address/provinces.model';
import { District } from '../../models/address/districts.model';
import { Ward } from '../../models/address/wards.model';
import { Image } from '../../models/Image';
import { ModelResponse } from '../../models/response/ModelResponse';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  // for changing when create, edit, delete => reload
  private accountChangeSubject = new Subject<void>();

  get accountChange$(): Observable<void> {
    return this.accountChangeSubject.asObservable();
  }

  notifyAccountChange(): void {
    this.accountChangeSubject.next();
  }

  constructor(
    private baseUrlService: BaseURLService,
    private httpClient: HttpClient,
  ) {
  }

  findAll(): Observable<Account[] | ModelResponse> {
    const url: string = `${this.baseUrlService.baseURL}/account`
    return this.httpClient.get<Account[] | ModelResponse>(url)
  }

  findById(id: number): Observable<Account> {
    const url: string = `${this.baseUrlService.baseURL}/account/detail/${id}`
    return this.httpClient.get<Account>(url);
  }

  insert(account: Account): Observable<Account> {
    const url: string = `${this.baseUrlService.baseURL}/account/create`
    return this.httpClient.post<Account>(url, account);
  }

  update(account: Account): Observable<ModelResponse> {
    const url: string = `${this.baseUrlService.baseURL}/account/update/${account.id}`
    return this.httpClient.post<ModelResponse>(url, account);
  }

  delete(id: number): Observable<ModelResponse> {
    const url: string = `${this.baseUrlService.baseURL}/account/delete/${id}`
    return this.httpClient.get<ModelResponse>(url);
  }
  
  findByEmailKeyword(emailKeyword: string): Observable<Account[]> {
    const url: string = `${this.baseUrlService.baseURL}/customerByEmail/${emailKeyword}`
    return this.httpClient.get<Account[]>(url);
  }

  isEmailExists(email: string): Observable<boolean> {
    const url: string = `${this.baseUrlService.baseURL}/isEmailExists/${email}`
    return this.httpClient.get<boolean>(url);
  }

  findAllAddress(): Observable<Address[]> {
    const url: string = `${this.baseUrlService.baseURL}/address`
    return this.httpClient.get<Address[]>(url)
  }

}
