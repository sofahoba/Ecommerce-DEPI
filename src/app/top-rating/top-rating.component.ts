import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FakeStoreService } from '../fake-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-rating',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './top-rating.component.html',
  styleUrl: './top-rating.component.css',
})
export class TopRatingComponent implements OnInit {
  star = faStar;
  heart = faHeart;
  products: any[] = [];

  constructor(private fakeStoreService: FakeStoreService, private router: Router) {}

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    try {
      // Fetch all products
      const allProducts = await this.fakeStoreService.getAllProducts();

      // Sort products by rating in descending order
      const sortedProducts = allProducts.sort((a: any, b: any) => b.rating.rate - a.rating.rate);

      // Take the top 8 products
      this.products = sortedProducts.slice(0, 8);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  generateStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, index) => rating > index);
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

  navigateToProducts() {
    this.router.navigate(['/products']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
