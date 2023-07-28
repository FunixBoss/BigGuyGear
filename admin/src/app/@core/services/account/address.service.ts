import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURLService } from '../base-url.service';
import { HttpClient } from '@angular/common/http';
import { Address } from '../../models/address/address.model';
import { Province } from '../../models/address/provinces.model';
import { District } from '../../models/address/districts.model';
import { Ward } from '../../models/address/wards.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl = "http://127.0.0.1:8000/api"
  constructor(
    private baseUrlService: BaseURLService,
    private httpClient: HttpClient,
  ) {
  }

  findAllAddress(): Observable<Address[]> {
    const url: string = `${this.baseUrlService.baseURL}/address`
    return this.httpClient.get<Address[]>(url)
  }

  findAllProvinces(): Observable<GetProvinceResponse> {
    const url: string = `${this.baseUrl}/provinces`
    return this.httpClient.get<GetProvinceResponse>(url);
  }

  findAllDistrictByProvince(provinceCode: string ): Observable<GetDistrictResponse> {
    const url: string = `${this.baseUrl}/provinces/${provinceCode}/districts`
    console.log(url);
    
    return this.httpClient.get<GetDistrictResponse>(url);
  }


  findAllWardByDistrict(districtCode: string): Observable<GetWardResponse> {
    const url: string = `${this.baseUrl}/districts/${districtCode}/wards`
    return this.httpClient.get<GetWardResponse>(url);
  }

  insertAddress(address: Address): Observable<Address> {
    const url: string = `${this.baseUrlService.baseURL}/account/insertAddress`
    return this.httpClient.post<Address>(url, address);
  }
}

export interface GetProvinceResponse {
  provinces: Province[]
}

export interface GetDistrictResponse {
  districts: District[]
}

export interface GetWardResponse {
  wards: Ward[]
}