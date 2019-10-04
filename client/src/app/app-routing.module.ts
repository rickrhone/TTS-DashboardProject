import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent} from './components/products/products.component';
import { EditAddProductsComponent} from './components/products/edit-add-products/edit-add-products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { EditAddCategoriesComponent } from './components/categories/edit-add-categories/edit-add-categories.component';
import { EditAddSuppliersComponent } from './components/suppliers/edit-add-suppliers/edit-add-suppliers.component';
import {DashboardMatComponent} from './components/dashboard-mat/dashboard-mat.component';

const routes: Routes = [
  { path: '',
    component: DashboardMatComponent
  },

// PRODUCT PATHS
  // the /products URI points to the products component
  {
    path: 'products',
    component: ProductsComponent
  },

  // points to the edit/add Product modal component
  {
    path: 'product-edit/:id',
    component: EditAddProductsComponent
  },

  // points to the edit/add Product modal component
  {
    path: 'product-add',
    component: EditAddProductsComponent
  },

  // CATEGORIES PATHS
  // the /categories URI points to the categories component
  {
    path: 'categories',
    component: CategoriesComponent
  },
  // points to the edit/add category modal component
  {
    path: 'category-edit/:id',
    component: EditAddCategoriesComponent
  },

  // points to the edit/add category modal component
  {
    path: 'category-add',
    component: EditAddCategoriesComponent
  },

  // SUPPLIERS PATHS
  // the /suppliers URI points to the suppliers component
  {
    path: 'suppliers',
    component: SuppliersComponent
  },
  // points to the edit/add supplier modal component
  {
    path: 'supplier-edit/:id',
    component: EditAddSuppliersComponent
  },

  // points to the edit/add supplier modal component
  {
    path: 'supplier-add',
    component: EditAddSuppliersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
