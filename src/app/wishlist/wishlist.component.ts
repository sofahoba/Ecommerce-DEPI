import { Component, OnInit } from '@angular/core';
import { FakeStoreService } from '../fake-store.service';
import { Product } from '../product.model';
import { WishlistItem } from '../wishlist-item.model';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];

  constructor(private fakeStoreService: FakeStoreService) { }

  ngOnInit(): void {
    this.loadWishlist();
  }

  async loadWishlist(): Promise<void> {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
    console.log('Wishlist items from localStorage:', wishlistItems);
    this.wishlistItems = await Promise.all(
      wishlistItems.map(async (item: any): Promise<WishlistItem> => {
        const product = await this.fakeStoreService.getProductById(item.productId);
        console.log('Fetched product:', product);
        return {
          id: item.productId,
          product: product,
          addedAt: new Date(item.addedAt)
        };
      })
    );
    console.log('Final wishlist items:', this.wishlistItems);
  }

  async removeFromWishlist(productId: number): Promise<void> {
    try {
      await this.fakeStoreService.removeFromWishlist(productId);
      await this.loadWishlist();
      this.showToast('success', 'Removed from Wishlist', 'Item removed successfully!');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      this.showToast('error', 'Error', 'Failed to remove item from wishlist. Please try again.');
    }
  }

  async addToCart(product: Product): Promise<void> {
    try {
      await this.fakeStoreService.addToCart(product.id);
      await this.removeFromWishlist(product.id);
      this.showToast('success', 'Added to Cart', 'Item added to cart and removed from wishlist!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.showToast('error', 'Error', 'Failed to add item to cart. Please try again.');
    }
  }

  private showToast(icon: 'success' | 'error', title: string, text: string): void {
    Swal.fire({
      icon,
      title,
      text,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
}
