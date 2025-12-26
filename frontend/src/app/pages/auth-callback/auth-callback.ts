import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  template: `<p>Processing login...</p>`,
})
export class AuthCallbackComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private authService = inject(Auth);

  constructor(private router: Router) {}

  ngOnInit() {
    // Lấy params 'code' từ URL
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      if (code) {
        this.authService.loginWithGoogle(code).subscribe({
          next: (res) => {
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
          },
          error: (err) => {
            console.error('Login failed', err);
            this.router.navigate(['/login']);
          },
        });
      }
    });
  }
}
