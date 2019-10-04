import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {MatTableDataSource} from '@angular/material/table';
import {Allproducts} from '../products/allproducts.model';
import {MatPaginator, MatSort} from '@angular/material';
import {CategoriesService} from '../../services/categories.service';
import {SuppliersService} from '../../services/suppliers.service';
import {Categories} from '../categories/categories.model';
import {Suppliers} from '../suppliers/suppliers.model';

@Component({
  selector: 'app-dashboard-mat',
  templateUrl: './dashboard-mat.component.html',
  styleUrls: ['./dashboard-mat.component.css']
})
export class DashboardMatComponent implements OnInit {
  AllProducts: Allproducts[]; // stores all the products
  dataSource = new MatTableDataSource(this.AllProducts); // table data source
  columnsToDisplay = ['productId', 'productName', 'fullPrice', 'salePrice', 'discount', 'supplier', 'category', 'availability'];
  AllCategories: Categories[]; // stores all the categories
  AllSuppliers: Suppliers[]; // stores all the suppliers

  filter = {
    option1: '', // user can choose at most 3 columns to filter on (ex. category, supplier, and availability)
    option2: '',
    option3: '',
    criteria1: '', // user can choose from >, <, ===
    criteria2: '',
    criteria3: '',
    filterValue1: '', // user can enter the value they want to filter on by dropdown or text
    filterValue2: '',
    filterValue3: ''
  };


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productsService: ProductsService,
              private categoriesService: CategoriesService,
              private suppliersService: SuppliersService) {

  }

  ngOnInit() {

    // Method to get all the products and assign it to the array of products called AllProducts
    this.productsService.getAll().subscribe(result => { // gets the current list of all products non-pageable
      this.AllProducts = result;
      console.log(this.AllProducts); // TODO: Delete
      this.dataSource.data = this.AllProducts;
    });


    // Apply pagination on initialization
    this.dataSource.paginator = this.paginator;

    // Apply sort on initialization
    this.dataSource.sort = this.sort;

    // Method to get all the categories and assign it to the array of categories called AllCategories
    this.categoriesService.getAll().subscribe(result => { // gets the current list of all categories non-pageable
      this.AllCategories = result;
    });

    // Method to get all the suppliers and assign it to the array of suppliers called AllSuppliers
    this.suppliersService.getAll().subscribe(result => { // gets the current list of all suppliers non-pageable
      this.AllSuppliers = result;
    });
  }

  // Filter Logic
  filterData(filter) {
    console.log(filter);

    let filteredDataFinal; // variable to store the filtered data and the end of the filtering process

    // What to do if all three options are chosen
    if (filter.option1 !== '' && filter.option2 !== '' && filter.option3 !== '') {
      console.log('Inside of 3 Options If Statement');

      // First: filter the data by option 1's criteria and value and store it in a variable
      let filteredData1; // Variable to store the first filtering of the Data

      // Product ID
      if (filter.option1 === 'productId') {
        if (filter.criteria1 === '>') {
          filteredData1 = this.AllProducts.filter(product => product.productId > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          filteredData1 = this.AllProducts.filter(product => product.productId < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.productId === filter.filterValue1);
        } else {
          console.log('Error in ProductId Filtering');
        } // Product Name
      } else if (filter.option1 === 'productName') {
        if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.productName === filter.filterValue1);
        } else  {
          console.log('Error in ProductName Filtering');
        } // Full Price
      } else if (filter.option1 === 'fullPrice') {
        if (filter.criteria1 === '>') {
          filteredData1 = this.AllProducts.filter(product => product.fullPrice > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          filteredData1 = this.AllProducts.filter(product => product.fullPrice < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.fullPrice === filter.filterValue1);
        } else {
          console.log('Error in fullPrice Filtering');
        } // Sale Price
      } else if (filter.option1 === 'salePrice') {
        if (filter.criteria1 === '>') {
          filteredData1 = this.AllProducts.filter(product => product.salePrice > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          filteredData1 = this.AllProducts.filter(product => product.salePrice < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.salePrice === filter.filterValue1);
        } else {
          console.log('Error in salePrice Filtering');
        } // Discount
      } else if (filter.option1 === 'discount') {
        if (filter.criteria1 === '>') {
          filteredData1 = this.AllProducts.filter(product => product.discount > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          filteredData1 = this.AllProducts.filter(product => product.discount < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.discount === filter.filterValue1);
        } else {
          console.log('Error in Discount Filtering');
        } // Supplier Name
      } else if (filter.option1 === 'supplierName') {
        if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.supplier.supplierName === filter.filterValue1);
        } else {
          console.log('Error in Supplier Filtering');
        } // Category
      } else if (filter.option1 === 'category') {
        if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.category.categoryName === filter.filterValue1);
        } else {
          console.log('Error in Category Filtering');
        } // Availability
      } else if (filter.option1 === 'availability') {
        if (filter.criteria1 === '==') {
          if (filter.filterValue1 === 'true') {
            filteredData1 = this.AllProducts.filter(product => product.availability === true);
          } else if (filter.filterValue1 === 'false') {
            filteredData1 = this.AllProducts.filter(product => product.availability === false);
          }
        } else {
          console.log('Error in Availability Filtering');
        }
      }

      console.log(filteredData1);

      // Second: filter the data remaining after option 1 by option 2's criteria and value and store it in a variable
      let filteredData2; // Variable to store the second filtering of the Data

      // Product ID
      if (filter.option2 === 'productId') {
        if (filter.criteria2 === '>') {
          filteredData2 = filteredData1.filter(product => product.productId > filter.filterValue2);
        } else if (filter.criteria2 === '<') {
          filteredData2 = filteredData1.filter(product => product.productId < filter.filterValue2);
        } else if (filter.criteria2 === '==') {
          filteredData2 = filteredData1.filter(product => product.productId === filter.filterValue2);
        } else {
          console.log('Error in ProductId Filtering');
        } // Product Name
      } else if (filter.option2 === 'productName') {
        if (filter.criteria2 === '==') {
          filteredData2 = filteredData1.filter(product => product.productName === filter.filterValue2);
        } else  {
          console.log('Error in ProductName Filtering');
        } // Full Price
      } else if (filter.option2 === 'fullPrice') {
        if (filter.criteria2 === '>') {
          filteredData2 = filteredData1.filter(product => product.fullPrice > filter.filterValue2);
        } else if (filter.criteria2 === '<') {
          filteredData2 = filteredData1.filter(product => product.fullPrice < filter.filterValue2);
        } else if (filter.criteria2 === '==') {
          filteredData2 = filteredData1.filter(product => product.fullPrice === filter.filterValue2);
        } else {
          console.log('Error in fullPrice Filtering');
        } // Sale Price
      } else if (filter.option2 === 'salePrice') {
        if (filter.criteria2 === '>') {
          filteredData2 = filteredData1.filter(product => product.salePrice > filter.filterValue2);
        } else if (filter.criteria2 === '<') {
          filteredData2 = filteredData1.filter(product => product.salePrice < filter.filterValue2);
        } else if (filter.criteria2 === '==') {
          filteredData2 = filteredData1.filter(product => product.salePrice === filter.filterValue2);
        } else {
          console.log('Error in salePrice Filtering');
        } // Discount
      } else if (filter.option2 === 'discount') {
        if (filter.criteria2 === '>') {
          filteredData2 = filteredData1.filter(product => product.discount > filter.filterValue2);
        } else if (filter.criteria2 === '<') {
          filteredData2 = filteredData1.filter(product => product.discount < filter.filterValue2);
        } else if (filter.criteria2 === '==') {
          filteredData2 = filteredData1.filter(product => product.discount === filter.filterValue2);
        } else {
          console.log('Error in Discount Filtering');
        } // Supplier Name
      } else if (filter.option2 === 'supplierName') {
        if (filter.criteria2 === '==') {
          filteredData2 = filteredData1.filter(product => product.supplier.supplierName === filter.filterValue2);
        } else {
          console.log('Error in Supplier Filtering');
        } // Category
      } else if (filter.option2 === 'category') {
        if (filter.criteria2 === '==') {
          filteredData2 = filteredData1.filter(product => product.category.categoryName === filter.filterValue2);
        } else {
          console.log('Error in Category Filtering');
        } // Availability
      } else if (filter.option2 === 'availability') {
        if (filter.criteria2 === '==') {
          if (filter.filterValue2 === 'true') {
            filteredData2 = filteredData1.filter(product => product.availability === true);
          } else if (filter.filterValue2 === 'false') {
            filteredData2 = filteredData1.filter(product => product.availability === false);
          }
        } else {
          console.log('Error in Availability Filtering');
        }
      }

      console.log(filteredData2);

      // Third: filter the data remaining after option 2 by option 3's criteria and value and assign it to the dataSource
      let filteredData3; // Variable to store the third filtering of the Data

      // Product ID
      if (filter.option3 === 'productId') {
        if (filter.criteria3 === '>') {
          filteredData3 = filteredData2.filter(product => product.productId > filter.filterValue3);
        } else if (filter.criteria3 === '<') {
          filteredData3 = filteredData2.filter(product => product.productId < filter.filterValue3);
        } else if (filter.criteria3 === '==') {
          filteredData3 = filteredData2.filter(product => product.productId === filter.filterValue3);
        } else {
          console.log('Error in ProductId Filtering');
        } // Product Name
      } else if (filter.option3 === 'productName') {
        if (filter.criteria3 === '==') {
          filteredData3 = filteredData2.filter(product => product.productName === filter.filterValue3);
        } else  {
          console.log('Error in ProductName Filtering');
        } // Full Price
      } else if (filter.option3 === 'fullPrice') {
        if (filter.criteria3 === '>') {
          filteredData3 = filteredData2.filter(product => product.fullPrice > filter.filterValue3);
        } else if (filter.criteria3 === '<') {
          filteredData3 = filteredData2.filter(product => product.fullPrice < filter.filterValue3);
        } else if (filter.criteria3 === '==') {
          filteredData3 = filteredData2.filter(product => product.fullPrice === filter.filterValue3);
        } else {
          console.log('Error in fullPrice Filtering');
        } // Sale Price
      } else if (filter.option3 === 'salePrice') {
        if (filter.criteria3 === '>') {
          filteredData3 = filteredData2.filter(product => product.salePrice > filter.filterValue3);
        } else if (filter.criteria3 === '<') {
          filteredData3 = filteredData2.filter(product => product.salePrice < filter.filterValue3);
        } else if (filter.criteria3 === '==') {
          filteredData3 = filteredData2.filter(product => product.salePrice === filter.filterValue3);
        } else {
          console.log('Error in salePrice Filtering');
        } // Discount
      } else if (filter.option3 === 'discount') {
        if (filter.criteria3 === '>') {
          filteredData3 = filteredData2.filter(product => product.discount > filter.filterValue3);
        } else if (filter.criteria3 === '<') {
          filteredData3 = filteredData2.filter(product => product.discount < filter.filterValue3);
        } else if (filter.criteria3 === '==') {
          filteredData3 = filteredData2.filter(product => product.discount === filter.filterValue3);
        } else {
          console.log('Error in Discount Filtering');
        } // Supplier Name
      } else if (filter.option3 === 'supplierName') {
        if (filter.criteria3 === '==') {
          filteredData3 = filteredData2.filter(product => product.supplier.supplierName === filter.filterValue3);
        } else {
          console.log('Error in Supplier Filtering');
        } // Category
      } else if (filter.option3 === 'category') {
        if (filter.criteria3 === '==') {
          filteredData3 = filteredData2.filter(product => product.category.categoryName === filter.filterValue3);
        } else {
          console.log('Error in Category Filtering');
        } // Availability
      } else if (filter.option3 === 'availability') {
        if (filter.criteria3 === '==') {
          if (filter.filterValue3 === 'true') {
            filteredData3 = filteredData2.filter(product => product.availability === true);
          } else if (filter.filterValue3 === 'false') {
            filteredData3 = filteredData2.filter(product => product.availability === false);
          }
        } else {
          console.log('Error in Availability Filtering');
        }
      }

      // assigning the filtered data to the variable that stores it
      filteredDataFinal = filteredData3;
      console.log(filteredData3);
    }


    // What to do if Only 2 options are chosen
    if (filter.option1 !== '' && filter.option2 !== '' && filter.option3 === '') {

      console.log('Inside of 2 Options If Statement');

      // First: filter the data by option 1's criteria and value and store it in a variable
      let filteredData1; // Variable to store the first filtering of the Data

      // Product ID
      if (filter.option1 === 'productId') {
        if (filter.criteria1 === '>') {
          filteredData1 = this.AllProducts.filter(product => product.productId > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          filteredData1 = this.AllProducts.filter(product => product.productId < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.productId === filter.filterValue1);
        } else {
          console.log('Error in ProductId Filtering');
        } // Product Name
      } else if (filter.option1 === 'productName') {
        if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.productName === filter.filterValue1);
        } else  {
          console.log('Error in ProductName Filtering');
        } // Full Price
      } else if (filter.option1 === 'fullPrice') {
        if (filter.criteria1 === '>') {
          filteredData1 = this.AllProducts.filter(product => product.fullPrice > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          filteredData1 = this.AllProducts.filter(product => product.fullPrice < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.fullPrice === filter.filterValue1);
        } else {
          console.log('Error in fullPrice Filtering');
        } // Sale Price
      } else if (filter.option1 === 'salePrice') {
        if (filter.criteria1 === '>') {
          filteredData1 = this.AllProducts.filter(product => product.salePrice > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          filteredData1 = this.AllProducts.filter(product => product.salePrice < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.salePrice === filter.filterValue1);
        } else {
          console.log('Error in salePrice Filtering');
        } // Discount
      } else if (filter.option1 === 'discount') {
        if (filter.criteria1 === '>') {
          filteredData1 = this.AllProducts.filter(product => product.discount > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          filteredData1 = this.AllProducts.filter(product => product.discount < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.discount === filter.filterValue1);
        } else {
          console.log('Error in Discount Filtering');
        } // Supplier Name
      } else if (filter.option1 === 'supplierName') {
        if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.supplier.supplierName === filter.filterValue1);
        } else {
          console.log('Error in Supplier Filtering');
        } // Category
      } else if (filter.option1 === 'category') {
        if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.category.categoryName === filter.filterValue1);
        } else {
          console.log('Error in Category Filtering');
        } // Availability
      } else if (filter.option1 === 'availability') {
        if (filter.criteria1 === '==') {
          if (filter.filterValue1 === 'true') {
            filteredData1 = this.AllProducts.filter(product => product.availability === true);
          } else if (filter.filterValue1 === 'false') {
            filteredData1 = this.AllProducts.filter(product => product.availability === false);
          }
        } else {
          console.log('Error in Availability Filtering');
        }
      }

      console.log(filteredData1);

      // Second: filter the data remaining after option 1 by option 2's criteria and value and assign it to the dataSource
      let filteredData2; // Variable to store the second filtering of the Data

      // Product ID
      if (filter.option2 === 'productId') {
        if (filter.criteria2 === '>') {
          filteredData2 = filteredData1.filter(product => product.productId > filter.filterValue2);
        } else if (filter.criteria2 === '<') {
          filteredData2 = filteredData1.filter(product => product.productId < filter.filterValue2);
        } else if (filter.criteria2 === '==') {
          filteredData2 = filteredData1.filter(product => product.productId === filter.filterValue2);
        } else {
          console.log('Error in ProductId Filtering');
        } // Product Name
      } else if (filter.option2 === 'productName') {
        if (filter.criteria2 === '==') {
          filteredData2 = filteredData1.filter(product => product.productName === filter.filterValue2);
        } else  {
          console.log('Error in ProductName Filtering');
        } // Full Price
      } else if (filter.option2 === 'fullPrice') {
        if (filter.criteria2 === '>') {
          filteredData2 = filteredData1.filter(product => product.fullPrice > filter.filterValue2);
        } else if (filter.criteria2 === '<') {
          filteredData2 = filteredData1.filter(product => product.fullPrice < filter.filterValue2);
        } else if (filter.criteria2 === '==') {
          filteredData2 = filteredData1.filter(product => product.fullPrice === filter.filterValue2);
        } else {
          console.log('Error in fullPrice Filtering');
        } // Sale Price
      } else if (filter.option2 === 'salePrice') {
        if (filter.criteria2 === '>') {
          filteredData2 = filteredData1.filter(product => product.salePrice > filter.filterValue2);
        } else if (filter.criteria2 === '<') {
          filteredData2 = filteredData1.filter(product => product.salePrice < filter.filterValue2);
        } else if (filter.criteria2 === '==') {
          filteredData2 = filteredData1.filter(product => product.salePrice === filter.filterValue2);
        } else {
          console.log('Error in salePrice Filtering');
        } // Discount
      } else if (filter.option2 === 'discount') {
        if (filter.criteria2 === '>') {
          filteredData2 = filteredData1.filter(product => product.discount > filter.filterValue2);
        } else if (filter.criteria2 === '<') {
          filteredData2 = filteredData1.filter(product => product.discount < filter.filterValue2);
        } else if (filter.criteria2 === '==') {
          filteredData2 = filteredData1.filter(product => product.discount === filter.filterValue2);
        } else {
          console.log('Error in Discount Filtering');
        } // Supplier Name
      } else if (filter.option2 === 'supplierName') {
        if (filter.criteria2 === '==') {
          filteredData2 = filteredData1.filter(product => product.supplier.supplierName === filter.filterValue2);
        } else {
          console.log('Error in Supplier Filtering');
        } // Category
      } else if (filter.option2 === 'category') {
        if (filter.criteria2 === '==') {
          filteredData2 = filteredData1.filter(product => product.category.categoryName === filter.filterValue2);
        } else {
          console.log('Error in Category Filtering');
        } // Availability
      } else if (filter.option2 === 'availability') {
        if (filter.criteria2 === '==') {
          if (filter.filterValue2 === 'true') {
            filteredData2 = filteredData1.filter(product => product.availability === true);
          } else if (filter.filterValue2 === 'false') {
            filteredData2 = filteredData1.filter(product => product.availability === false);
          }
        } else {
          console.log('Error in Availability Filtering');
        }
      }

      // assigning the filtered data to the variable that stores it
      filteredDataFinal = filteredData2;
      console.log(filteredData2);
    }




    // What to do if Only 1 option is chosen
    if (filter.option1 !== '' && filter.option2 === '' && filter.option3 === '') {

      console.log('Inside of 1 Option If Statement');

      // First: filter the data by option 1's criteria and value and assign it to the dataSource
      let filteredData1; // Variable to store the first filtering of the Data

      // Product ID
      if (filter.option1 === 'productId') {
        if (filter.criteria1 === '>') {
          filteredData1 = this.AllProducts.filter(product => product.productId > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          filteredData1 = this.AllProducts.filter(product => product.productId < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.productId === filter.filterValue1);
        } else {
          console.log('Error in ProductId Filtering');
        } // Product Name
      } else if (filter.option1 === 'productName') {
        if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.productName === filter.filterValue1);
        } else  {
          console.log('Error in ProductName Filtering');
        } // Full Price
      } else if (filter.option1 === 'fullPrice') {
        if (filter.criteria1 === '>') {
          filteredData1 = this.AllProducts.filter(product => product.fullPrice > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          filteredData1 = this.AllProducts.filter(product => product.fullPrice < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.fullPrice === filter.filterValue1);
        } else {
          console.log('Error in fullPrice Filtering');
        } // Sale Price
      } else if (filter.option1 === 'salePrice') {
        if (filter.criteria1 === '>') {
          filteredData1 = this.AllProducts.filter(product => product.salePrice > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          filteredData1 = this.AllProducts.filter(product => product.salePrice < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.salePrice === filter.filterValue1);
        } else {
          console.log('Error in salePrice Filtering');
        } // Discount
      } else if (filter.option1 === 'discount') {
        if (filter.criteria1 === '>') {
          filteredData1 = this.AllProducts.filter(product => product.discount > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          filteredData1 = this.AllProducts.filter(product => product.discount < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.discount === filter.filterValue1);
        } else {
          console.log('Error in Discount Filtering');
        } // Supplier Name
      } else if (filter.option1 === 'supplierName') {
        if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.supplier.supplierName === filter.filterValue1);
        } else {
          console.log('Error in Supplier Filtering');
        } // Category
      } else if (filter.option1 === 'category') {
        if (filter.criteria1 === '==') {
          filteredData1 = this.AllProducts.filter(product => product.category.categoryName === filter.filterValue1);
        } else {
          console.log('Error in Category Filtering');
        } // Availability
      } else if (filter.option1 === 'availability') {
          if (filter.filterValue1 === 'true') {
            filteredData1 = this.AllProducts.filter(product => product.availability === true);
          } else if (filter.filterValue1 === 'false') {
            filteredData1 = this.AllProducts.filter(product => product.availability === false);
          } else {
          console.log('Error in Availability Filtering');
        }
      }

      // assigning the filtered data to the variable that stores it
      filteredDataFinal = filteredData1;
      console.log(filteredData1);
    }


    // Assigning the filtered data to the dataSource
    this.dataSource.data = filteredDataFinal;

    console.log(this.dataSource);
    console.log('Data Has Been Filtered');
  }

  // Filter Logic
  unfilterData() {
    this.dataSource.data = this.AllProducts;
    this.filter = {
      option1: '', // user can choose at most 3 columns to filter on (ex. category, supplier, and availability)
      option2: '',
      option3: '',
      criteria1: '', // user can choose from >, <, ===
      criteria2: '',
      criteria3: '',
      filterValue1: '', // user can enter the value they want to filter on by dropdown or text
      filterValue2: '',
      filterValue3: ''
    };

    console.log('Data Unfiltered');
  }

  // General Filter
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
