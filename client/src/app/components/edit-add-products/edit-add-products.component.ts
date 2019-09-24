import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsServiceService} from '../../services/products-service.service';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../services/categories.service';
import {SuppliersService} from '../../services/suppliers.service';

@Component({
  selector: 'app-edit-add-products',
  templateUrl: './edit-add-products.component.html',
  styleUrls: ['./edit-add-products.component.css']
})
export class EditAddProductsComponent implements OnInit, OnDestroy {
  product: any = {}; // declares and initializes an empty array of products
  sub: Subscription;  // declares a variable name sub of type Subscription

  // TODO: need to create a method to pull in all the current categories
  categories: any = {}; // declares and initializes an empty array of Categories


  // Constructor that takes in the route,  router and the product services
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productsService: ProductsServiceService,
              private categoriesService: CategoriesService,
              private suppliersService: SuppliersService) { }

  ngOnInit() {

    // on initialization check to see if products with IDs exists if so
    // call the get() product by id method in the service and for each product
    // store that product in the product array along with it's href (URI containing id)
    // if not (no product with id) then log to the console the message below and navigate to product table via the gotoProducts method
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.productsService.get(id).subscribe((product: any) => {
          if (product) {
            this.product = product;
            this.product.href = product._links.self.href;
             } else {
            console.log(`Product with id '${id}' not found, returning to products table`);
            this.gotoProducts();
          }
        });
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoProducts() {
    this.router.navigate(['/products']);
  }

  save(form: NgForm) {
    this.productsService.save(form).subscribe(result => {
      this.gotoProducts();
    }, error => console.error(error));
  }


}
