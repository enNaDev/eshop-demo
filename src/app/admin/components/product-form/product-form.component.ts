import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories: any[] = [];
  product: any[] = [];
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    categoryService.getAll().subscribe((res) => {
      this.categories = res.map(change => ({ key: change.payload.key, ...change.payload.val() as {} }));
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
  }

  save(product) {
    if (this.id)
      this.productService.update(this.id, product);
    else
      this.productService.create(product);

    this.router.navigate(['admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['admin/products']);
  }
}
