import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// Add this interface definition

// Update the WishlistItem interface
interface WishlistItem {
  productId: number;
  addedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class FakeStoreService {
  private cartUpdated = new BehaviorSubject<void>(undefined);
  private wishlistUpdated = new BehaviorSubject<void>(undefined);

  cartUpdated$ = this.cartUpdated.asObservable();
  wishlistUpdated$ = this.wishlistUpdated.asObservable();

  constructor(private http: HttpClient) {}

  // Fake Store API
  // Get all products
  async getAllProducts() {
    return axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }

  // Get a single product by id
  async getProductById(productId: number) {
    return axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(`Error fetching product ${productId}:`, error);
      });
  }

  // Limit Results
  async getLimitedProducts(limit: number) {
    return axios
      .get(`https://fakestoreapi.com/products?limit=${limit}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('Error fetching limited products:', error);
      });
  }

  // Sort Results
  async getSortedProducts(order: 'asc' | 'desc') {
    return axios
      .get(`https://fakestoreapi.com/products?sort=${order}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(`Error sorting products in ${order} order:`, error);
      });
  }

  // Get All Categories
  async getAllCategories() {
    return axios
      .get('https://fakestoreapi.com/products/categories')
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }

  // Get Products by Category
  async getProductsByCategory(category: string) {
    return axios
      .get(`https://fakestoreapi.com/products/category/${category}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(
          `Error fetching products in category ${category}:`,
          error
        );
      });
  }

  // Get a Single Cart
  async getCartById(cartId: number) {
    return axios
      .get(`https://fakestoreapi.com/carts/${cartId}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(`Error fetching cart ${cartId}:`, error);
      });
  }

  // login
  async login(username: string, password: string) {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      });

      if (response.status !== 200) {
        throw new Error('Login failed');
      }

      // Store the token in localStorage
      localStorage.setItem('authToken', response.data.token);

      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
  // Register
  async registerUser(user: any) {
    return axios
      .post('https://fakestoreapi.com/users', user)
      .then((response) => {
        console.log('User registered successfully:', response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('Error during registration:', error);
      });
  }

  // Filter products by category and price range
  async getFilteredProducts(
    category?: string,
    minPrice?: number,
    maxPrice?: number
  ) {
    try {
      let url = 'https://fakestoreapi.com/products';

      if (category) {
        url += `/category/${category}`;
      }

      const response = await axios.get(url);
      let filteredProducts = response.data;

      if (minPrice !== undefined || maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter((product: any) => {
          if (minPrice !== undefined && maxPrice !== undefined) {
            return product.price >= minPrice && product.price <= maxPrice;
          } else if (minPrice !== undefined) {
            return product.price >= minPrice;
          } else if (maxPrice !== undefined) {
            return product.price <= maxPrice;
          }
          return true;
        });
      }

      console.log('Filtered products:', filteredProducts);
      return filteredProducts;
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      throw error;
    }
  }

  // Get unique sizes from all products (mock data as the API doesn't provide sizes)
  async getAvailableSizes() {
    // This is mock data. In a real scenario, you'd fetch this from your backend
    return ['XS', 'S', 'M', 'L', 'XL'];
  }

  // Get unique colors from all products (mock data as the API doesn't provide colors)
  async getAvailableColors() {
    // This is mock data. In a real scenario, you'd fetch this from your backend
    return ['green', 'white', 'black', 'red', 'blue'];
  }

  // Get price range (min and max prices from all products)
  async getPriceRange() {
    try {
      const products = await this.getAllProducts();
      const prices = products.map((product: any) => product.price);
      return {
        min: Math.min(...prices),
        max: Math.max(...prices),
      };
    } catch (error) {
      console.error('Error fetching price range:', error);
      throw error;
    }
  }

  async addToCart(productId: number, quantity: number = 1) {
    try {
      // In a real application, you would send a request to your backend
      // For now, we'll just store the item in localStorage
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const existingItem = cartItems.find(
        (item: any) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartItems.push({ productId, quantity });
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.cartUpdated.next();
      return { success: true, message: 'Item added to cart' };
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return { success: false, message: 'Failed to add item to cart' };
    }
  }

  async removeFromCart(productId: number) {
    try {
      // In a real application, you would send a request to your backend
      // For now, we'll just remove the item from localStorage
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const updatedCartItems = cartItems.filter(
        (item: any) => item.productId !== productId
      );

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      this.cartUpdated.next();
      return { success: true, message: 'Item removed from cart' };
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return { success: false, message: 'Failed to remove item from cart' };
    }
  }

  logout() {
    // Remove the auth token from localStorage
    localStorage.removeItem('authToken');
    // Remove the isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    // Clear any other user-related data from localStorage if needed
    // For example:
    // localStorage.removeItem('userData');

    console.log('User logged out successfully');
  }

  isLoggedIn(): boolean {
    // Check if the authToken exists in localStorage
    const authToken = localStorage.getItem('authToken');
    return !!authToken; // Returns true if authToken exists, false otherwise
  }

  getWishlistItems(): WishlistItem[] {
    const wishlistItems = JSON.parse(
      localStorage.getItem('wishlistItems') || '[]'
    );
    return wishlistItems;
  }

  async addToWishlist(productId: number) {
    const wishlistItems = this.getWishlistItems();
    if (!wishlistItems.some((item) => item.productId === productId)) {
      wishlistItems.push({ productId, addedAt: new Date() });
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
      this.wishlistUpdated.next();
    }
    return Promise.resolve({ success: true });
  }

  async removeFromWishlist(productId: number) {
    const wishlistItems = this.getWishlistItems();
    const updatedWishlist = wishlistItems.filter(
      (item) => item.productId !== productId
    );
    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
    this.wishlistUpdated.next();
    return Promise.resolve({ success: true });
  }

  isInWishlist(productId: number): boolean {
    const wishlistItems = this.getWishlistItems();
    return wishlistItems.some((item) => item.productId === productId);
  }

  getCartItemCount(): number {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    return cartItems.reduce((total: number, item: any) => total + item.quantity, 0);
  }

  getWishlistItemCount(): number {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
    return wishlistItems.length;
  }
}
