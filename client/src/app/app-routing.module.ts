import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent} from './components/products/products.component';
import { EditAddProductsComponent} from './components/edit-add-products/edit-add-products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';

const routes: Routes = [
  // TODO: remove the redirect of the homepage fromt the products table to it's owm
  { path: '', redirectTo: '/products', pathMatch: 'full' },

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

  // the /categories URI points to the categories component
  {
    path: 'categories',
    component: CategoriesComponent
  },

  // the /suppliers URI points to the suppliers component
  {
    path: 'suppliers',
    component: SuppliersComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
