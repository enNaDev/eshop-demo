import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';

// import { OrderService } from 'src/app/shared/services/order.service';


@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  @Input('cart') cart: ShoppingCart;

  constructor() {
  }
}
