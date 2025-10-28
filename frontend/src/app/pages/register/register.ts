import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzCheckboxModule,
    NzDividerModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm: FormGroup;
  isLoading = false;
  passwordVisible = false;
  confirmPasswordVisible = false;

  constructor(private fb: FormBuilder, private router: Router, private message: NzMessageService) {
    this.registerForm = this.fb.group(
      {
        fullname: ['', [Validators.required, Validators.minLength(3)]],
        username: [
          '',
          [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        numberphone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        agreeToTerms: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const formData = { ...this.registerForm.value };
      delete formData.confirmPassword;
      delete formData.agreeToTerms;

      // TODO: Integrate with backend API
      console.log('Register with:', formData);

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.message.success('Đăng ký thành công! Vui lòng đăng nhập.');
        this.router.navigate(['/login']);
      }, 1500);
    } else {
      Object.values(this.registerForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  registerWithGoogle(): void {
    this.message.info('Tính năng đăng ký với Google đang phát triển');
    // TODO: Implement Google OAuth
  }

  registerWithFacebook(): void {
    this.message.info('Tính năng đăng ký với Facebook đang phát triển');
    // TODO: Implement Facebook OAuth
  }
}
