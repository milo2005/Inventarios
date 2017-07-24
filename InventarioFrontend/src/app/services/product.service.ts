import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product, SimpleResponse, PostResponse } from '../models/_index';

@Injectable()
export class ProductService {

    selected: Product;

    constructor(public http: HttpClient) {

    }

    all() {
        return this.http.get<Product[]>('/products');
    }

    delete(id: number) {
        return this.http.delete<SimpleResponse>(`/products/${id}`);
    }

    add(product: Product) {
        return this.http.post<PostResponse>('/products', product);
    }

    update(product: Product) {
        return this.http.put<SimpleResponse>(`/products`, product);
    }

}
