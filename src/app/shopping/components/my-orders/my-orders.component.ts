import { Component } from '@angular/core';
import { switchMap } from "rxjs/operators";

import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders: any;
  orderTotalPrice: Number[] = [];

  constructor(authService: AuthService, orderService: OrderService) {
    authService.user$.pipe(
      switchMap(u => orderService.getOrdersByUser(u.uid))
    ).subscribe(order => {
      this.orders = order;
      console.log(this.orders)
      this.orders.map(order => {
        order.datePlaced = new Date(order.datePlaced);
      });

      let i = 0;
      this.orders.forEach(order => {
        let totalPriceOfEachOrder = 0;
        order.items.forEach(item => {
          totalPriceOfEachOrder += item.totalPrice;
        });
        this.orderTotalPrice[i] = totalPriceOfEachOrder;
        i++;
      })
    });
  }
}
