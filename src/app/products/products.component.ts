import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from '../truncate.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faFilter } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/fontawesome-free-regular';
import { FakeStoreService } from '../fake-store.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    TruncatePipe,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  regularHeart = regularHeart;
  solidHeart = solidHeart;
  star = faStar;
  heart = faHeart;
  filter = faFilter;
  data: any[] = [];
  categories: string[] = [];
  sizes: string[] = [];
  colors: string[] = [];
  priceRange: { min: number; max: number } = { min: 0, max: 695 };

  selectedCategory: string = '';
  selectedSize: string = '';
  selectedColor: string = '';
  selectedPriceRange: number = 695;

  constructor(private fakeStoreService: FakeStoreService) {}

  async ngOnInit() {
    await this.loadInitialData();
    await this.applyFilters();
  }

  async loadInitialData() {
    this.categories = await this.fakeStoreService.getAllCategories();
    this.sizes = await this.fakeStoreService.getAvailableSizes();
    this.colors = await this.fakeStoreService.getAvailableColors();
    const fetchedPriceRange = await this.fakeStoreService.getPriceRange();
    this.priceRange = {
      min: Math.floor(fetchedPriceRange.min),
      max: Math.ceil(fetchedPriceRange.max),
    };
    this.selectedPriceRange = this.priceRange.max;
  }

  async applyFilters() {
    this.data = await this.fakeStoreService.getFilteredProducts(
      this.selectedCategory,
      0,
      this.selectedPriceRange
    );
    this.data = this.data.map((item) => ({
      ...item,
      isInWishlist: this.fakeStoreService.isInWishlist(item.id),
    }));
  }

  async onCategoryChange() {
    await this.applyFilters();
  }

  async onSizeChange() {
    console.log('Selected size:', this.selectedSize);
    await this.applyFilters();
  }

  async onColorChange() {
    console.log('Selected color:', this.selectedColor);
    await this.applyFilters();
  }

  async onPriceRangeChange() {
    await this.applyFilters();
  }

  generateStars(rating: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, index) => rating > index);
  }

  getRatingClass(rating: number): string {
    if (rating >= 4) {
      return 'rating-good';
    } else if (rating >= 3) {
      return 'rating-medium';
    } else {
      return 'rating-bad';
    }
  }

  async addToCart(event: Event, productId: number) {
    event.stopPropagation();
    try {
      const result = await this.fakeStoreService.addToCart(productId);
      if (result.success) {
        this.showToast('success', 'Added to Cart', 'Item added successfully!');
      } else {
        this.showToast(
          'error',
          'Error',
          'Failed to add item to cart. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      this.showToast(
        'error',
        'Error',
        'An unexpected error occurred. Please try again later.'
      );
    }
  }

  async toggleWishlist(event: Event, item: any): Promise<void> {
    event.stopPropagation();
    try {
      if (item.isInWishlist) {
        await this.fakeStoreService.removeFromWishlist(item.id);
        item.isInWishlist = false;
        this.showToast(
          'success',
          'Removed from Wishlist',
          'Item removed successfully!'
        );
      } else {
        await this.fakeStoreService.addToWishlist(item.id);
        item.isInWishlist = true;
        this.showToast(
          'success',
          'Added to Wishlist',
          'Item added successfully!'
        );
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      this.showToast(
        'error',
        'Error',
        'Failed to update wishlist. Please try again.'
      );
    }
  }

  private showToast(
    icon: 'success' | 'error',
    title: string,
    text: string
  ): void {
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
