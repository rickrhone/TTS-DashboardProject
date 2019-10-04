import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './components/products/products.component';

import { FormsModule } from '@angular/forms';
import { EditAddProductsComponent } from './components/products/edit-add-products/edit-add-products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { EditAddSuppliersComponent } from './components/suppliers/edit-add-suppliers/edit-add-suppliers.component';
import { EditAddCategoriesComponent } from './components/categories/edit-add-categories/edit-add-categories.component';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { SuppliersService } from './services/suppliers.service';
import { ChartsModule } from 'ng2-charts';

// To get CRUD operation alerts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DashboardMatComponent } from './components/dashboard-mat/dashboard-mat.component';

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    EditAddProductsComponent,
    CategoriesComponent,
    SuppliersComponent,
    EditAddSuppliersComponent,
    EditAddCategoriesComponent,
    DashboardMatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ChartsModule
  ],
  providers: [CategoriesService, ProductsService, SuppliersService], // so multiple components can share the same service
  bootstrap: [AppComponent]
})
export class AppModule {}
