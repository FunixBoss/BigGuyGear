import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { BaseURLService } from '../base-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authChangeSubject = new Subject<void>();

  get authChange$(): Observable<void> {
    return this.authChangeSubject.asObservable();
  }

  authChange(): void {
    this.authChangeSubject.next();
  }

  baseUrl: string = 'http://localhost:8000'
  constructor(
    private baseUrlService: BaseURLService,
    private httpClient: HttpClient,
  ) {
  }

  isLoggedIn(): boolean {
    if(localStorage.getItem('token')) {
      return true
0   }
    return false;
  }

  login(email: string, password: string): Observable<GetResponseToken> {
    const url: string = `${this.baseUrl}/login`
    return this.httpClient.post<GetResponseToken>(url, {email: email, password: password})
  }

  logout(): Observable<boolean> {
    const url: string = `${this.baseUrl}/logout`

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'), // Replace `token` with your actual token value
    });

    return this.httpClient.get<boolean>(url, { headers });
  }

}

export interface GetResponseToken {
  token: string;
}
