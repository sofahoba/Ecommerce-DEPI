import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) {}

  addToCart(product: any) {
    // Replace with your actual API endpoint
    return this.http.post('/api/cart', product).toPromise();
  }
}

