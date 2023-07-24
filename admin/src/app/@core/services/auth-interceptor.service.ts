import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        // Get the token from your authentication service or wherever it's stored
        const token = localStorage.getItem("token");

        // Clone the request and add the Authorization header
        const authRequest = request.clone({
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        });

        // Pass the modified request to the next interceptor or to the HTTP handler
        return next.handle(authRequest);
    }
}