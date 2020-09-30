import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

import { AppUser } from '../../../shared/models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$ : Observable<any>;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = (await this.shoppingCartService.getCart());
  }

  logout() {
    this.auth.logout();
  }
}
