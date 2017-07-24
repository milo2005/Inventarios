import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent, ProductEditComponent, ProductListComponent } from './components/_index';


const appRoutes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'add', component: ProductAddComponent },
    { path: 'edit/:id', component: ProductEditComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ], exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
