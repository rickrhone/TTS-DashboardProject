import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent} from './components/products/products.component';

const routes: Routes = [
  // TODO: remove the redirect of the homepage fromt the products table to it's owm
  { path: '', redirectTo: '/products', pathMatch: 'full' },

  // the /products URI points to the products component
  {
    path: 'products',
    component: ProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
