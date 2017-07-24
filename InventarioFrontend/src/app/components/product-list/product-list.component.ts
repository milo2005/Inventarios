import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavService, ProductService } from '../../services/_index';
import { Product } from '../../models/_index';

declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  productToDelete: Product;
  data: Product[] = [];

  constructor(public nav: NavService, public service: ProductService, public router: Router) {

    nav.title = 'Inventario';

    this.service.all().subscribe(data => {
      this.data = data;
    });

  }

  ngOnInit() {
    $('.modal').modal();
  }

  deleteDialog(product: Product) {
    this.productToDelete = product;
    $('#deleteDialog').modal('open');
  }

  deleteProduct() {
    this.service.delete(this.productToDelete.id).subscribe(res => {
      if (res.success) {
        const index = this.data.indexOf(this.productToDelete);
        this.data.splice(index, 1);
      } else {
        Materialize.toast('Error al eliminar producto', 4000);
      }
    });
  }

  goToAdd() {
    this.router.navigate(['add']);
  }

  goToEdit(product: Product) {
    this.service.selected = product;
    this.router.navigate([`edit/${product.id}`]);
  }

}
