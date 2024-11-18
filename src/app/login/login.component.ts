import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { FakeStoreService } from '../fake-store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private fakeStoreService: FakeStoreService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const result = await this.fakeStoreService.login(this.loginForm.value.username, this.loginForm.value.password);
        console.log('Login successful', result);

        // Show success toast
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        // Navigate to home page after successful login
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Login error', error);

        // Show error modal
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or password. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    } else {
      this.loginForm.markAllAsTouched();

      // Show warning toast for invalid form
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill in all required fields correctly.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    }
  }
}
