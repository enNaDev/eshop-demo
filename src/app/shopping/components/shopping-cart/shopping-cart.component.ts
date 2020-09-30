import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<any>;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  clearCart() {
    if (!confirm('Are you sure you want to clear your shopping cart?')) return;

    this.shoppingCartService.clearCart();
  }
}
