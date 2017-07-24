import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { ProductAddComponent, ProductEditComponent, ProductListComponent } from './components/_index';
import { ProductService, NavService } from './services/_index';

@NgModule({
  declarations: [
    AppComponent, ProductListComponent, ProductEditComponent, ProductAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ProductService, NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
