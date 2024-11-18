import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { FakeStoreService } from '../fake-store.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registrationError: string = '';

  constructor(
    private fb: FormBuilder,
    private fakeStoreService: FakeStoreService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.registerForm.valid) {
      try {
        const user = {
          email: this.registerForm.value.email,
          username: this.registerForm.value.email,
          password: this.registerForm.value.password,
          name: {
            firstname: this.registerForm.value.firstName,
            lastname: this.registerForm.value.lastName
          }
        };

        const result = await this.fakeStoreService.registerUser(user);
        console.log('Registration successful', result);
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Registration error', error);
        this.registrationError = 'Registration failed. Please try again.';
      }
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
}
