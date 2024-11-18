import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { CartbodyComponent } from './Cart/cartbody.component';
import { TrackComponent } from './track/track.component';
import { WishlistComponent } from './wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'category/:category', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductDetailsComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartbodyComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CartbodyComponent, canActivate: [AuthGuard] },
  { path: 'track', component: TrackComponent, canActivate: [AuthGuard] },
  { path: 'success', component: CartbodyComponent, canActivate: [AuthGuard] },
  { path: 'cancel', component: CartbodyComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, data: { standalone: true } },
  { path: 'signup', component: RegisterComponent, data: { standalone: true } },
  { path: '**', component: NotFoundComponent, data: { standalone: true } },
];
