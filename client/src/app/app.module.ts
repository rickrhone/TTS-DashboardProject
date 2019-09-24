import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './components/products/products.component';

import { FormsModule } from '@angular/forms';
import { EditAddProductsComponent } from './components/edit-add-products/edit-add-products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { EditAddSuppliersComponent } from './components/edit-add-suppliers/edit-add-suppliers.component';
import { EditAddCategoriesComponent } from './components/edit-add-categories/edit-add-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    EditAddProductsComponent,
    CategoriesComponent,
    SuppliersComponent,
    EditAddSuppliersComponent,
    EditAddCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
