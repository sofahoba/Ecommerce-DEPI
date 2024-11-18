import { Component, Renderer2, Inject, OnInit, OnDestroy } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons';
import { RouterModule } from '@angular/router';
import {
  faLocationDot,
  faBars,
  faShoppingCart,
  faChevronDown,
  faX,
  faMagnifyingGlass,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { FakeStoreService } from '../fake-store.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Offcanvas } from 'bootstrap';  // <-- Import Bootstrap JS
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit, OnDestroy {
  location = faLocationDot;
  user = faUser;
  heart = faHeart;
  bars = faBars;
  cart = faShoppingCart;
  down = faChevronDown;
  x = faX;
  magnifying = faMagnifyingGlass;
  signOut = faSignOutAlt;

  isMobileMenuOpen = false;

  private offcanvasInstance: Offcanvas | null = null;

  searchTerm: string = '';
  searchResults: any[] = [];
  showDropdown: boolean = false;

  isCategoryDropdownOpen = false;

  isMobileCategoryDropdownOpen = false;

  cartItemCount: number = 0;
  wishlistItemCount: number = 0;

  private cartSubscription: Subscription = new Subscription();
  private wishlistSubscription: Subscription = new Subscription();

  constructor(
    public fakeStoreService: FakeStoreService,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.updateItemCounts();
  }

  ngOnInit() {
    this.cartSubscription = this.fakeStoreService.cartUpdated$.subscribe(() => {
      this.updateItemCounts();
    });

    this.wishlistSubscription = this.fakeStoreService.wishlistUpdated$.subscribe(() => {
      this.updateItemCounts();
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.wishlistSubscription) {
      this.wishlistSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    const offcanvasElement = this.document.getElementById('toggleMenu');
    if (offcanvasElement) {
      this.offcanvasInstance = new Offcanvas(offcanvasElement);  // Initialize the offcanvas instance
    }
  }

  logout() {
    this.fakeStoreService.logout();
    this.router.navigate(['/login']);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.renderer.addClass(this.document.body, 'mobile-menu-open');
    } else {
      this.renderer.removeClass(this.document.body, 'mobile-menu-open');
    }
  }

  navigateAndClose(route: string) {
    this.toggleMobileMenu();
    if (route === '/login' && this.fakeStoreService.isLoggedIn()) {
      // If user is already logged in, navigate to home instead
      this.router.navigate(['/']);
    } else {
      this.router.navigate([route]);
    }
  }

  logoutMobile() {
    this.fakeStoreService.logout();
    this.toggleMobileMenu();
    this.router.navigate(['/']);
  }

  async searchProducts() {
    if (this.searchTerm.length > 2) {
      try {
        const allProducts = await this.fakeStoreService.getAllProducts();
        this.searchResults = allProducts.filter((product: any) =>
          product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        ).slice(0, 5);
        this.showDropdown = true;
      } catch (error) {
        console.error('Error searching products:', error);
      }
    } else {
      this.searchResults = [];
      this.showDropdown = false;
    }
  }

  navigateToProduct(productId: number) {
    if (this.fakeStoreService.isLoggedIn()) {
      this.router.navigate(['/product', productId]);
      this.searchTerm = '';
      this.showDropdown = false;
    } else {
      this.router.navigate(['/login']);
    }
  }

  hideDropdown() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  toggleCategoryDropdown(event: Event) {
    event.preventDefault();
    this.isCategoryDropdownOpen = !this.isCategoryDropdownOpen;
  }

  toggleMobileCategoryDropdown() {
    this.isMobileCategoryDropdownOpen = !this.isMobileCategoryDropdownOpen;
  }

  updateItemCounts() {
    this.cartItemCount = this.fakeStoreService.getCartItemCount();
    this.wishlistItemCount = this.fakeStoreService.getWishlistItemCount();
  }

  closeCategoryDropdown() {
    this.isCategoryDropdownOpen = false;
  }
}
