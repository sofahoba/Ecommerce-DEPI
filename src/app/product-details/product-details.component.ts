import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FakeStoreService } from '../fake-store.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faShoppingCart, faStar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { register } from 'swiper/element/bundle';
import { TruncatePipe } from '../shared/pipes/truncate.pipe';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TruncatePipe, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ProductDetailsComponent implements OnInit {
  productDetails: any = {};
  currentImageIndex: number = 0;
  isLoading: boolean = true;
  isInWishlist: boolean = false;
  addingToCart: boolean = false;
  addedToCart: boolean = false;
  relatedProducts: any[] = [];

  // FontAwesome icons
  faHeart = faHeart;
  faShoppingCart = faShoppingCart;
  faStar = faStar;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  constructor(
    private route: ActivatedRoute,
    private fakeStoreService: FakeStoreService
  ) {
    register();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchProductDetails(parseInt(id));
    }
  }

  async fetchProductDetails(id: number) {
    this.isLoading = true;
    try {
      this.productDetails = await this.fakeStoreService.getProductById(id);
      // Simulate multiple images
      this.productDetails.images = [this.productDetails.image, this.productDetails.image, this.productDetails.image];
      this.checkWishlistStatus();
      await this.fetchRelatedProducts();
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async fetchRelatedProducts() {
    try {
      const products = await this.fakeStoreService.getProductsByCategory(this.productDetails.category);
      this.relatedProducts = products.filter((product: any) => product.id !== this.productDetails.id).slice(0, 10);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.productDetails.images.length;
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.productDetails.images.length) % this.productDetails.images.length;
  }

  async addToCart() {
    this.addingToCart = true;
    try {
      await this.fakeStoreService.addToCart(this.productDetails.id);
      this.addedToCart = true;
      setTimeout(() => this.addedToCart = false, 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      this.addingToCart = false;
    }
  }

  async toggleWishlist() {
    try {
      if (this.isInWishlist) {
        await this.fakeStoreService.removeFromWishlist(this.productDetails.id);
      } else {
        await this.fakeStoreService.addToWishlist(this.productDetails.id);
      }
      this.isInWishlist = !this.isInWishlist;
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  }

  checkWishlistStatus() {
    this.isInWishlist = this.fakeStoreService.isInWishlist(this.productDetails.id);
  }

  generateStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, index) => rating > index);
  }
}
