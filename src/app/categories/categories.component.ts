import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/fontawesome-free-regular';
import { FakeStoreService } from '../fake-store.service';
import { TruncatePipe } from '../truncate.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TruncatePipe],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  category: string = '';
  products: any[] = [];
  heart = faHeart;
  star = faStar;

  constructor(
    private route: ActivatedRoute,
    private fakeStoreService: FakeStoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.loadProducts();
    });
  }

  async loadProducts() {
    try {
      this.products = await this.fakeStoreService.getProductsByCategory(
        this.category
      );
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  getCategoryImage(): string {
    // You'll need to add actual images for each category
    const images: { [key: string]: string } = {
      electronics: 'assets/electronics.jpg',
      jewelery: 'assets/jewelery.jpg',
      "men's clothing": 'assets/mens-clothing.jpg',
      "women's clothing": 'assets/womens-clothing.jpg',
    };
    return images[this.category] || 'assets/default.jpg';
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

  navigateToProductDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
