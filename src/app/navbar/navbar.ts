import { Component, inject } from '@angular/core'; 
import { RouterLink } from '@angular/router';
import { StateService } from '../services/state'; 
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

  cartCount$ = this.stateService.cart$.pipe(
    map(cart => cart.length)
  );
}