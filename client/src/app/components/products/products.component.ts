import { Component, OnInit } from '@angular/core';
import {ProductsServiceService} from '../../services/products-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<any>; // defines an array to store all products in

  constructor(private productsService: ProductsServiceService) { }

  ngOnInit() {
    // on init get all the products and store them in the products array
    this.productsService.getAll().subscribe(data => {
      this.products = data;
    });
  }

}
