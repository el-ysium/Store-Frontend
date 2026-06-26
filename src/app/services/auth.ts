import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'userEmail';
  private authState = new BehaviorSubject<boolean>(this.isLoggedIn());

  isAuthenticated$ = this.authState.asObservable();

  login(email: string): void {
    localStorage.setItem(this.storageKey, email);
    this.authState.next(true);
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.authState.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  getCurrentUser(): string | null {
    return localStorage.getItem(this.storageKey);
  }
}
