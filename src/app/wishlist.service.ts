import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private http: HttpClient) {}

  addToWishlist(product: any) {
    // Replace with your actual API endpoint
    return this.http.post('/api/wishlist', product).toPromise();
  }

  removeFromWishlist(productId: number) {
    // Replace with your actual API endpoint
    return this.http.delete(`/api/wishlist/${productId}`).toPromise();
  }

  isInWishlist(productId: number) {
    // Replace with your actual API endpoint
    return this.http.get<boolean>(`/api/wishlist/check/${productId}`).toPromise();
  }
}

