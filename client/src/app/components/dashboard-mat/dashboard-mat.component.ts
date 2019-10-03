import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Allproducts} from '../products/allproducts.model';

@Component({
  selector: 'app-dashboard-mat',
  templateUrl: './dashboard-mat.component.html',
  styleUrls: ['./dashboard-mat.component.css']
})
export class DashboardMatComponent implements OnInit {
  AllProducts: Allproducts[]; // stores all the products
  dataSource = new MatTableDataSource(this.AllProducts); // table data source
  columnsToDisplay = ['productId', 'productName', 'fullPrice', 'salePrice', 'discount', 'supplier', 'category', 'availability'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productsService: ProductsService) {

  }

  ngOnInit() {

    // Method to get all the products and assign it to the array of products called AllProducts
    this.productsService.getAll().subscribe(result => { // gets the current list of all products non-pageable
      this.AllProducts = result;
      this.dataSource.data = this.AllProducts;
    });

    // Apply pagination on initialization
    this.dataSource.paginator = this.paginator;

    // Apply sort on initialization
    this.dataSource.sort = this.sort;
  }

}
