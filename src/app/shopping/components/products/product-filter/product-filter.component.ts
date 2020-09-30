import { Component, Input } from '@angular/core';

import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  @Input('category') category;
  categories: any[] = [];

  constructor(categoryService: CategoryService) {
    categoryService.getAll().subscribe((res) => {
      this.categories = res.map(change => ({ key: change.payload.key, ...change.payload.val() as {} }));
    });
  }
}
