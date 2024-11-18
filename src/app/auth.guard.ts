import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FakeStoreService } from './fake-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private fakeStoreService: FakeStoreService, private router: Router) {}

  canActivate(): boolean {
    if (this.fakeStoreService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

