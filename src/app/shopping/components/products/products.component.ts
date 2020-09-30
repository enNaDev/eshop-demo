import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ProductService } from 'src/app/shared/services/product.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().subscribe((res) => {
      this.products = res.map((change) => ({
        key: change.payload.key,
        ...(change.payload.val() as {}),
      }));

      this.route.queryParamMap.subscribe((params) => {
        this.category = params.get('category');
        this.applyFilter();
      });
    });
  }

  private applyFilter() {
    this.filteredProducts = this.category
    ? this.products.filter((p) => p.category === this.category)
    : this.products;
  }
}
