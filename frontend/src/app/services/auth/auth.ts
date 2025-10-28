import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../types/user';

interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:8000/api';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = this.getUserFromStorage();
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Login
   */
  login(email: string, password: string, remember: boolean): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, {
        email,
        password,
        remember,
      })
      .pipe(
        tap((response) => {
          if (response.token) {
            this.saveAuthData(response);
            this.currentUserSubject.next(response.user);
          }
        })
      );
  }

  /**
   * Logout
   */
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.clearAuthData();
      })
    );
  }

  /**
   * Lưu dữ liệu xác thực
   */
  private saveAuthData(response: LoginResponse): void {
    // Lưu token
    localStorage.setItem('auth_token', response.token);

    // Lưu user info (chỉ cần thiết)
    const userToStore: User = {
      id: response.user.id,
      fullname: response.user.fullname,
      email: response.user.email,
      numberphone: response.user.numberphone,
      role: response.user.role,
      status: response.user.status,
      avatarimage: response.user.avatarimage,
      ordernum: response.user.ordernum,
      rejectnum: response.user.rejectnum,
      address: response.user.address,
      username: response.user.username,
    };
    localStorage.setItem('user', JSON.stringify(userToStore));

    // Lưu thời gian hết hạn token (7 ngày)
    const expiryTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem('token_expiry', expiryTime.toString());

    // Lưu thời gian đăng nhập
    localStorage.setItem('last_login', new Date().toISOString());
  }

  /**
   * Xóa dữ liệu xác thực
   */
  private clearAuthData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    localStorage.removeItem('token_expiry');
    localStorage.removeItem('last_login');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Lấy user từ storage
   */
  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;

    try {
      return JSON.parse(userJson);
    } catch (e) {
      console.error('Error parsing user data:', e);
      return null;
    }
  }

  /**
   * Check xem user đã đăng nhập chưa
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Check token expiry
    const expiry = localStorage.getItem('token_expiry');
    if (expiry) {
      const expiryTime = parseInt(expiry);
      if (new Date().getTime() > expiryTime) {
        this.clearAuthData();
        return false;
      }
    }

    return true;
  }

  /**
   * Lấy token
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Lấy thông tin user hiện tại
   */
  getCurrentUser(): User | null {
    return this.getUserFromStorage();
  }

  /**
   * Check role
   */
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  /**
   * Check multiple roles
   */
  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  /**
   * Check user status
   */
  isActive(): boolean {
    const user = this.getCurrentUser();
    return user?.status === 'active';
  }

  /**
   * Update user info trong storage
   */
  updateUserInfo(updatedUser: Partial<User>): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const newUser = { ...currentUser, ...updatedUser };
      localStorage.setItem('user', JSON.stringify(newUser));
      this.currentUserSubject.next(newUser);
    }
  }

  /**
   * Get user stats
   */
  getUserStats(): { ordernum: number; rejectnum: number } | null {
    const user = this.getCurrentUser();
    if (!user) return null;

    return {
      ordernum: user.ordernum,
      rejectnum: user.rejectnum,
    };
  }
}
