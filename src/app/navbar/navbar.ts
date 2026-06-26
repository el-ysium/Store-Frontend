import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StateService } from '../services/state';
import { AuthService } from '../services/auth';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  imports: [RouterLink, CommonModule],
  styleUrl: '../app.css',
})
export class Navbar {
  private stateService = inject(StateService);
  private authService = inject(AuthService);
  private router = inject(Router);

  cartCount$ = this.stateService.cart$.pipe(
    map(cart => cart.length),
  );

  isAuthenticated$ = this.authService.isAuthenticated$;
  currentUser$ = this.authService.isAuthenticated$.pipe(
    map(isAuth => (isAuth ? this.authService.getCurrentUser() : null)),
  );

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}