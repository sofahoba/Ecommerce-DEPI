import { loadStripe } from '@stripe/stripe-js';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faX, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FakeStoreService } from '../fake-store.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cartbody.component.html',
  styleUrl: './cartbody.component.css',
  imports: [FontAwesomeModule, CommonModule, RouterModule, FormsModule, HttpClientModule],
})
export class CartbodyComponent implements OnInit {
  right = faArrowRight;
  x = faX;
  heart = faHeart;

  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(
    private fakeStoreService: FakeStoreService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadCartItems();
    this.checkPaymentStatus();
  }

  async loadCartItems() {
    try {
      // Load cart items from localStorage instead of using the fake API
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      this.cartItems = await Promise.all(cartItems.map(async (item: any) => {
        const product = await this.fakeStoreService.getProductById(item.productId);
        return { ...product, quantity: item.quantity };
      }));
      this.calculateTotal();
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  removeItem(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateLocalStorage();
    this.calculateTotal();
  }

  updateQuantity(productId: number, newQuantity: number) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity = newQuantity;
      this.updateLocalStorage();
      this.calculateTotal();
    }
  }

  updateLocalStorage() {
    const cartItems = this.cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  checkout(): void {
    const items = this.cartItems.map(item => ({
      name: item.title,
      product: item.image,
      price: item.price,
      quantity: item.quantity
    }));

    this.http.post('http://localhost:4242/checkout', { items })
      .subscribe(
        (response: any) => {
          if (response && response.url) {
            window.location.href = response.url;
          } else {
            console.error('Invalid response from server');
            this.handleCheckoutError('Invalid server response');
          }
        },
        (error) => {
          console.error('Error during checkout:', error);
          this.handleCheckoutError('An error occurred during checkout');
        }
      );
  }

  handleCheckoutError(message: string): void {
    alert(message);
  }

  checkPaymentStatus(): void {
    this.route.queryParams.subscribe(params => {
      const sessionId = params['session_id'];
      if (sessionId) {
        this.http.get(`http://localhost:4242/session-status?session_id=${sessionId}`)
          .subscribe(
            (response: any) => {
              if (response.status === 'complete') {
                this.handleCheckoutSuccess(response.customer_email);
              } else {
                this.handleCheckoutCancel();
              }
            },
            (error) => {
              console.error('Error checking session status:', error);
              this.handleCheckoutError('An error occurred while verifying payment');
            }
          );
      }
    });
  }

  handleCheckoutSuccess(customerEmail: string): void {
    this.cartItems = [];
    this.updateLocalStorage();
    this.calculateTotal();
    alert(`Payment successful! A confirmation email has been sent to ${customerEmail}`);
    this.router.navigate(['/track']);
  }

  handleCheckoutCancel(): void {
    alert('Checkout was cancelled. Your cart items are still available.');
    this.router.navigate(['/cart']);
  }
}
