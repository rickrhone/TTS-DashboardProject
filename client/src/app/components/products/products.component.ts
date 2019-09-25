import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<any>; // defines an array to store all products in


  // Constructor that takes in the route,  router and the product services
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productsService: ProductsService) { }

  ngOnInit() {
    // on init get all the products and store them in the products array
    this.productsService.getAll().subscribe(data => {
      this.products = data;
    });
  }

  gotoProducts() {
    this.router.navigate(['/products']);
  }

  remove(href) {
    this.productsService.remove(href).subscribe(result => {
      this.gotoProducts();
    }, error => console.error(error));
  }

}
