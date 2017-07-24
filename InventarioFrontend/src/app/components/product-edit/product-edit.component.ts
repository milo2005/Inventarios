import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavService, ProductService } from '../../services/_index';
import { Product } from '../../models/_index';

declare var Materialize: any;

@Component({
    templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnDestroy {

    product: Product;

    constructor(public nav: NavService, public service: ProductService, public router: Router) {
        nav.title = 'Actualizar Producto';
        this.product = service.selected;
    }

    update() {
        this.service.update(this.product).subscribe(res => {
            if (res.success) {
                this.router.navigate(['../']);
                Materialize.toast('Producto actualizado', 4000);
            } else {
                Materialize.toast('Error al actualizar producto', 4000);
            }
        });
    }

    ngOnDestroy() {
        this.service.selected = null;
    }

}
