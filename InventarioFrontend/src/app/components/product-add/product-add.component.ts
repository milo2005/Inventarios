import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavService, ProductService } from '../../services/_index';
import { Product } from '../../models/_index';

declare var Materialize: any;

@Component({
  templateUrl: './product-add.component.html'
})
export class ProductAddComponent {

  product: Product;

  constructor(public nav: NavService, public service: ProductService, public router: Router) {
    nav.title = 'Agregar Producto';
    this.product = new Product();
  }

  add() {
    this.service.add(this.product).subscribe(res => {
      if (res.success) {
        this.router.navigate(['../']);
        Materialize.toast('Producto agregado', 4000);
      } else {
        Materialize.toast('Error al agregar producto', 4000);
      }
    });
  }

}
