import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  subscription: Subscription;
  products: any[];
  filteredProducts: any[];

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe((res) => {
      this.filteredProducts = this.products = res.map(change => ({key: change.payload.key, ...change.payload.val() as {}}));
   });
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
