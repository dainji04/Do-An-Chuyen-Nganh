import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  isLoading = false;
  passwordVisible = false;

  private authService = inject(Auth);

  constructor(private fb: FormBuilder, private router: Router, private message: NzMessageService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password, remember } = this.loginForm.value;

      // TODO: Integrate with backend API
      console.log('Login with:', { email, password, remember });

      this.authService.login(email, password, remember).subscribe({
        next: () => {
          this.isLoading = false;
          this.message.success('Đăng nhập thành công!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.isLoading = false;
          this.message.error('Tài khoản hoặc mật khẩu không đúng.');
        },
      });
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  loginWithGoogle(): void {
    this.message.info('Tính năng đăng nhập với Google đang phát triển');
    // TODO: Implement Google OAuth
  }

  loginWithFacebook(): void {
    this.message.info('Tính năng đăng nhập với Facebook đang phát triển');
    // TODO: Implement Facebook OAuth
  }
}
