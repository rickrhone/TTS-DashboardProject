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
  genFilterVisible = false; // stores the state of the general filter
  customFilterVisible = false; // stores the state of the custom filter
  filteredDataFinal: Allproducts[] = [ // default values set to assist with filtering logic
    {
      productId: 0,
      productName: '',
      category: {
        categoryId: 0,
        categoryName: '',
      },
      fullPrice: 0,
      salePrice: 0,
      discount: 0,
      availability: false,
      supplier: {
        supplierId: 0,
        supplierName: ''
  }}];

  // variable to store the filtered data and the end of the filtering process
  filteredData1: Allproducts[] = []; // Variable to store the first filtering of the Data
  filteredData2: Allproducts[] = []; // Variable to store the second filtering of the Data
  filteredData3: Allproducts[] = []; // Variable to store the third filtering of the Data
  filterBtnClick = false; // stores the state of the filter button

  // Object to store values from the custom filter
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

  // Define the views of the table
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['# of Categories', '# of Suppliers', '# of Products'];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartData = [
    {data: [65, 59, 80]}, // default values replaced on init
  ];

  public doughnutChartLabels = ['# of Categories', '# of Suppliers', '# of Product'];
  public doughnutChartData = [120, 150, 180]; // default values replaced on init
  public doughnutChartType = 'doughnut';


  constructor(private route: ActivatedRoute,
              private router: Router,
              private productsService: ProductsService,
              private categoriesService: CategoriesService,
              private suppliersService: SuppliersService) {

  }

  ngOnInit() {

    console.log(this.filteredDataFinal.length);

    // Method to get all the products and assign it to the array of products called AllProducts
    this.productsService.getAll().subscribe(result => { // gets the current list of all products non-pageable
      this.AllProducts = result;
      this.dataSource.data = this.AllProducts;
      this.barChartData[0].data[2] = this.AllProducts.length; // adds the number of products to the bar chart
      this.doughnutChartData[2] = this.AllProducts.length; // adds the number of products to the doughnut chart
    });

    // Apply pagination on initialization
    this.dataSource.paginator = this.paginator;

    // Apply sort on initialization
    this.dataSource.sort = this.sort;

    // Method to get all the categories and assign it to the array of categories called AllCategories
    this.categoriesService.getAll().subscribe(result => { // gets the current list of all categories non-pageable
      this.AllCategories = result;
      this.barChartData[0].data[0] = this.AllCategories.length; // adds the number of categories to the bar chart
      this.doughnutChartData[0] = this.AllCategories.length; // adds the number of categories to the doughnutChart
    });


    // Method to get all the suppliers and assign it to the array of suppliers called AllSuppliers
    this.suppliersService.getAll().subscribe(result => { // gets the current list of all suppliers non-pageable
      this.AllSuppliers = result;
      this.barChartData[0].data[1] = this.AllSuppliers.length; // adds the number of suppliers to the bar chart
      this.doughnutChartData[1] = this.AllSuppliers.length; // adds the number of suppliers to the doughnut chart
    });

  }

  toggleGeneralFilter() {
    if (this.genFilterVisible === false) {
      this.genFilterVisible = true;
    } else {
      this.genFilterVisible = false;
    }
  }

  toggleCustomFilter() {
    if (this.customFilterVisible === false) {
      this.customFilterVisible = true;
    } else {
      this.customFilterVisible = false;
    }
  }

  // General Filter
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Custom Filter Logic
  filterData(filter) {
    // change the state of the filter button
    if (filter.filterValue1 !== '') {
      this.filterBtnClick = true;
    }

    // if (this.filterBtnClick === true && filter.filterValue1 !== '' && filter.filterValue2 === '') {
    //   this.filterBtnClick = false;
    // } else {
    //   this.filterBtnClick = true;
    // }
    //
    // if (this.filterBtnClick === true && filter.filterValue1 !== '' && filter.filterValue2 !== '') {
    //   this.filterBtnClick = false;
    // }  else {
    //   this.filterBtnClick = true;
    // }


    console.log(filter.filterValue1);
    console.log(this.filterBtnClick);


    // What to do if all three options are chosen
    if (filter.option1 !== '' && filter.option2 !== '' && filter.option3 !== '') {

      // First: filter the data by option 1's criteria and value and store it in a variable

      // Product ID
      if (filter.option1 === 'productId') {
        if (filter.criteria1 === '>') {
          this.filteredData1 = this.AllProducts.filter(product => product.productId > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          this.filteredData1 = this.AllProducts.filter(product => product.productId < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          this.filteredData1 = this.AllProducts.filter(product => product.productId === parseInt(filter.filterValue1, 10));
        } else {
          console.log('Error in ProductId Filtering');
        } // Product Name
      } else if (filter.option1 === 'productName') {
          this.filteredData1 = this.AllProducts.filter(product => product.productName === filter.filterValue1);
        // Full Price
      } else if (filter.option1 === 'fullPrice') {
        if (filter.criteria1 === '>') {
          this.filteredData1 = this.AllProducts.filter(product => product.fullPrice > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          this.filteredData1 = this.AllProducts.filter(product => product.fullPrice < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          this.filteredData1 = this.AllProducts.filter(product => product.fullPrice === parseFloat(filter.filterValue1));
        } else {
          console.log('Error in fullPrice Filtering');
        } // Sale Price
      } else if (filter.option1 === 'salePrice') {
        if (filter.criteria1 === '>') {
          this.filteredData1 = this.AllProducts.filter(product => product.salePrice > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          this.filteredData1 = this.AllProducts.filter(product => product.salePrice < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          this.filteredData1 = this.AllProducts.filter(product => product.salePrice === parseFloat(filter.filterValue1));
        } else {
          console.log('Error in salePrice Filtering');
        } // Discount
      } else if (filter.option1 === 'discount') {
        if (filter.criteria1 === '>') {
          this.filteredData1 = this.AllProducts.filter(product => (product.discount * 100) > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          this.filteredData1 = this.AllProducts.filter(product => (product.discount * 100) < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          this.filteredData1 = this.AllProducts.filter(
            product => parseFloat((product.discount * 100).toPrecision(4))  ===  parseFloat(filter.filterValue1));
        } else {
          console.log('Error in Discount Filtering');
        } // Supplier Name
      } else if (filter.option1 === 'supplierName') {
          this.filteredData1 = this.AllProducts.filter(product => product.supplier.supplierName === filter.filterValue1);
       // Category
      } else if (filter.option1 === 'category') {
          this.filteredData1 = this.AllProducts.filter(product => product.category.categoryName === filter.filterValue1);
         // Availability
      } else if (filter.option1 === 'availability') {
        if (filter.criteria1 === '==') {
            this.filteredData1 = this.AllProducts.filter(product => product.availability === true);
          } else if (filter.filterValue1 === 'false') {
            this.filteredData1 = this.AllProducts.filter(product => product.availability === false);
          } else {
          console.log('Error in Availability Filtering');
        }
      }

      // Second: filter the data remaining after option 1 by option 2's criteria and value and store it in a variable

      // Product ID
      if (filter.option2 === 'productId') {
        if (filter.criteria2 === '>') {
          this.filteredData2 = this.filteredData1.filter(product => product.productId > filter.filterValue2);
        } else if (filter.criteria2 === '<') {
          this.filteredData2 = this.filteredData1.filter(product => product.productId < filter.filterValue2);
        } else if (filter.criteria2 === '==') {
          this.filteredData2 = this.filteredData1.filter(product => product.productId === parseInt(filter.filterValue2, 10));
        } else {
          console.log('Error in ProductId Filtering');
        } // Product Name
      } else if (filter.option2 === 'productName') {
          this.filteredData2 = this.filteredData1.filter(product => product.productName === filter.filterValue2);
        // Full Price
      } else if (filter.option2 === 'fullPrice') {
        if (filter.criteria2 === '>') {
          this.filteredData2 = this.filteredData1.filter(product => product.fullPrice > filter.filterValue2);
        } else if (filter.criteria2 === '<') {
          this.filteredData2 = this.filteredData1.filter(product => product.fullPrice < filter.filterValue2);
        } else if (filter.criteria2 === '==') {
          this.filteredData2 = this.filteredData1.filter(product => product.fullPrice === parseFloat(filter.filterValue2));
        } else {
          console.log('Error in fullPrice Filtering');
        } // Sale Price
      } else if (filter.option2 === 'salePrice') {
        if (filter.criteria2 === '>') {
          this.filteredData2 = this.filteredData1.filter(product => product.salePrice > filter.filterValue2);
        } else if (filter.criteria2 === '<') {
          this.filteredData2 = this.filteredData1.filter(product => product.salePrice < filter.filterValue2);
        } else if (filter.criteria2 === '==') {
          this.filteredData2 = this.filteredData1.filter(product => product.salePrice === parseFloat(filter.filterValue2));
        } else {
          console.log('Error in salePrice Filtering');
        } // Discount
      } else if (filter.option2 === 'discount') {
        if (filter.criteria2 === '>') {
          this.filteredData2 = this.filteredData1.filter(product => (product.discount * 100) > filter.filterValue2);
        } else if (filter.criteria2 === '<') {
          this.filteredData2 = this.filteredData1.filter(product => (product.discount * 100) < filter.filterValue2);
        } else if (filter.criteria2 === '==') {
          this.filteredData2 = this.filteredData1.filter(
            product => parseFloat((product.discount * 100).toPrecision(4))  ===  parseFloat(filter.filterValue2));
        } else {
          console.log('Error in Discount Filtering');
        } // Supplier Name
      } else if (filter.option2 === 'supplierName') {
          this.filteredData2 = this.filteredData1.filter(product => product.supplier.supplierName === filter.filterValue2);
        // Category
      } else if (filter.option2 === 'category') {
          this.filteredData2 = this.filteredData1.filter(product => product.category.categoryName === filter.filterValue2);
        // Availability
      } else if (filter.option2 === 'availability') {
          if (filter.filterValue2 === 'true') {
            this.filteredData2 = this.filteredData1.filter(product => product.availability === true);
          } else if (filter.filterValue2 === 'false') {
            this.filteredData2 = this.filteredData1.filter(product => product.availability === false);
          } else {
          console.log('Error in Availability Filtering');
        }
      }


      // Third: filter the data remaining after option 2 by option 3's criteria and value and assign it to the dataSource

      // Product ID
      if (filter.option3 === 'productId') {
        if (filter.criteria3 === '>') {
          this.filteredData3 = this.filteredData2.filter(product => product.productId > filter.filterValue3);
        } else if (filter.criteria3 === '<') {
          this.filteredData3 = this.filteredData2.filter(product => product.productId < filter.filterValue3);
        } else if (filter.criteria3 === '==') {
          this.filteredData3 = this.filteredData2.filter(product => product.productId === parseInt(filter.filterValue3, 10));
        } else {
          console.log('Error in ProductId Filtering');
        } // Product Name
      } else if (filter.option3 === 'productName') {
          this.filteredData3 = this.filteredData2.filter(product => product.productName === filter.filterValue3);
         // Full Price
      } else if (filter.option3 === 'fullPrice') {
        if (filter.criteria3 === '>') {
          this.filteredData3 = this.filteredData2.filter(product => product.fullPrice > filter.filterValue3);
        } else if (filter.criteria3 === '<') {
          this.filteredData3 = this.filteredData2.filter(product => product.fullPrice < filter.filterValue3);
        } else if (filter.criteria3 === '==') {
          this.filteredData3 = this.filteredData2.filter(product => product.fullPrice === parseFloat(filter.filterValue3));
        } else {
          console.log('Error in fullPrice Filtering');
        } // Sale Price
      } else if (filter.option3 === 'salePrice') {
        if (filter.criteria3 === '>') {
          this.filteredData3 = this.filteredData2.filter(product => product.salePrice > filter.filterValue3);
        } else if (filter.criteria3 === '<') {
          this.filteredData3 = this.filteredData2.filter(product => product.salePrice < filter.filterValue3);
        } else if (filter.criteria3 === '==') {
          this.filteredData3 = this.filteredData2.filter(product => product.salePrice === parseFloat(filter.filterValue3));
        } else {
          console.log('Error in salePrice Filtering');
        } // Discount
      } else if (filter.option3 === 'discount') {
        if (filter.criteria3 === '>') {
          this.filteredData3 = this.filteredData2.filter(product => (product.discount * 100) > filter.filterValue3);
        } else if (filter.criteria3 === '<') {
          this.filteredData3 = this.filteredData2.filter(product => (product.discount * 100) < filter.filterValue3);
        } else if (filter.criteria3 === '==') {
          this.filteredData3 = this.filteredData2.filter(
            product => parseFloat((product.discount * 100).toPrecision(4))  ===  parseFloat(filter.filterValue3));
        } else {
          console.log('Error in Discount Filtering');
        } // Supplier Name
      } else if (filter.option3 === 'supplierName') {
          this.filteredData3 = this.filteredData2.filter(product => product.supplier.supplierName === filter.filterValue3);
         // Category
      } else if (filter.option3 === 'category') {
          this.filteredData3 = this.filteredData2.filter(product => product.category.categoryName === filter.filterValue3);
         // Availability
      } else if (filter.option3 === 'availability') {
          if (filter.filterValue3 === 'true') {
            this.filteredData3 = this.filteredData2.filter(product => product.availability === true);
          } else if (filter.filterValue3 === 'false') {
            this.filteredData3 = this.filteredData2.filter(product => product.availability === false);
          } else {
          console.log('Error in Availability Filtering');
        }
      }

      // assigning the filtered data to the variable that stores it
      this.filteredDataFinal = this.filteredData3;
    }


    // What to do if Only 2 options are chosen
    if (filter.option1 !== '' && filter.option2 !== '' && filter.option3 === '') {

      // First: filter the data by option 1's criteria and value and store it in a variable

      // Product ID
      if (filter.option1 === 'productId') {
        if (filter.criteria1 === '>') {
          this.filteredData1 = this.AllProducts.filter(product => product.productId > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          this.filteredData1 = this.AllProducts.filter(product => product.productId < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          this.filteredData1 = this.AllProducts.filter(product => product.productId === parseInt(filter.filterValue1, 10));
        } else {
          console.log('Error in ProductId Filtering');
        } // Product Name
      } else if (filter.option1 === 'productName') {
          this.filteredData1 = this.AllProducts.filter(product => product.productName === filter.filterValue1);
         // Full Price
      } else if (filter.option1 === 'fullPrice') {
        if (filter.criteria1 === '>') {
          this.filteredData1 = this.AllProducts.filter(product => product.fullPrice > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          this.filteredData1 = this.AllProducts.filter(product => product.fullPrice < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          this.filteredData1 = this.AllProducts.filter(product => product.fullPrice === parseFloat(filter.filterValue1));
        } else {
          console.log('Error in fullPrice Filtering');
        } // Sale Price
      } else if (filter.option1 === 'salePrice') {
        if (filter.criteria1 === '>') {
          this.filteredData1 = this.AllProducts.filter(product => product.salePrice > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          this.filteredData1 = this.AllProducts.filter(product => product.salePrice < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          this.filteredData1 = this.AllProducts.filter(product => product.salePrice === parseFloat(filter.filterValue1));
        } else {
          console.log('Error in salePrice Filtering');
        } // Discount
      } else if (filter.option1 === 'discount') {
        if (filter.criteria1 === '>') {
          this.filteredData1 = this.AllProducts.filter(product => (product.discount * 100) > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          this.filteredData1 = this.AllProducts.filter(product => (product.discount * 100)  < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          this.filteredData1 = this.AllProducts.filter(
            product => parseFloat((product.discount * 100).toPrecision(4))  ===  parseFloat(filter.filterValue1));
        } else {
          console.log('Error in Discount Filtering');
        } // Supplier Name
      } else if (filter.option1 === 'supplierName') {
          this.filteredData1 = this.AllProducts.filter(product => product.supplier.supplierName === filter.filterValue1);
         // Category
      } else if (filter.option1 === 'category') {
          this.filteredData1 = this.AllProducts.filter(product => product.category.categoryName === filter.filterValue1);
         // Availability
      } else if (filter.option1 === 'availability') {
          if (filter.filterValue1 === 'true') {
            this.filteredData1 = this.AllProducts.filter(product => product.availability === true);
          } else if (filter.filterValue1 === 'false') {
            this.filteredData1 = this.AllProducts.filter(product => product.availability === false);
          } else {
          console.log('Error in Availability Filtering');
        }
      }


      // Second: filter the data remaining after option 1 by option 2's criteria and value and assign it to the dataSource

      // Product ID
      if (filter.option2 === 'productId') {
        if (filter.criteria2 === '>') {
          this.filteredData2 = this.filteredData1.filter(product => product.productId > filter.filterValue2);
        } else if (filter.criteria2 === '<') {
          this.filteredData2 = this.filteredData1.filter(product => product.productId < filter.filterValue2);
        } else if (filter.criteria2 === '==') {
          this.filteredData2 = this.filteredData1.filter(product => product.productId === parseInt(filter.filterValue2, 10));
        } else {
          console.log('Error in ProductId Filtering');
        } // Product Name
      } else if (filter.option2 === 'productName') {
          this.filteredData2 = this.filteredData1.filter(product => product.productName === filter.filterValue2);
         // Full Price
      } else if (filter.option2 === 'fullPrice') {
        if (filter.criteria2 === '>') {
          this.filteredData2 = this.filteredData1.filter(product => product.fullPrice > filter.filterValue2);
        } else if (filter.criteria2 === '<') {
          this.filteredData2 = this.filteredData1.filter(product => product.fullPrice < filter.filterValue2);
        } else if (filter.criteria2 === '==') {
          this.filteredData2 = this.filteredData1.filter(product => product.fullPrice === parseFloat(filter.filterValue2));
        } else {
          console.log('Error in fullPrice Filtering');
        } // Sale Price
      } else if (filter.option2 === 'salePrice') {
        if (filter.criteria2 === '>') {
          this.filteredData2 = this.filteredData1.filter(product => product.salePrice > filter.filterValue2);
        } else if (filter.criteria2 === '<') {
          this.filteredData2 = this.filteredData1.filter(product => product.salePrice < filter.filterValue2);
        } else if (filter.criteria2 === '==') {
          this.filteredData2 = this.filteredData1.filter(product => product.salePrice === parseFloat(filter.filterValue2));
        } else {
          console.log('Error in salePrice Filtering');
        } // Discount
      } else if (filter.option2 === 'discount') {
        if (filter.criteria2 === '>') {
          this.filteredData2 = this.filteredData1.filter(product => (product.discount * 100) > filter.filterValue2);
        } else if (filter.criteria2 === '<') {
          this.filteredData2 = this.filteredData1.filter(product => (product.discount * 100) < filter.filterValue2);
        } else if (filter.criteria2 === '==') {
          this.filteredData2 = this.filteredData1.filter(
            product => parseFloat((product.discount * 100).toPrecision(4))  ===  parseFloat(filter.filterValue2));
        } else {
          console.log('Error in Discount Filtering');
        } // Supplier Name
      } else if (filter.option2 === 'supplierName') {
          this.filteredData2 = this.filteredData1.filter(product => product.supplier.supplierName === filter.filterValue2);
         // Category
      } else if (filter.option2 === 'category') {
          this.filteredData2 = this.filteredData1.filter(product => product.category.categoryName === filter.filterValue2);
        // Availability
      } else if (filter.option2 === 'availability') {
          if (filter.filterValue2 === 'true') {
            this.filteredData2 = this.filteredData1.filter(product => product.availability === true);
          } else if (filter.filterValue2 === 'false') {
            this.filteredData2 = this.filteredData1.filter(product => product.availability === false);
          } else {
          console.log('Error in Availability Filtering');
        }
      }

      // assigning the filtered data to the variable that stores it
      this.filteredDataFinal = this.filteredData2;
    }


    // What to do if Only 1 option is chosen
    if (filter.option1 !== '' && filter.option2 === '' && filter.option3 === '') {

      // First: filter the data by option 1's criteria and value and assign it to the dataSource

      // Product ID
      if (filter.option1 === 'productId') {
        if (filter.criteria1 === '>') {
          this.filteredData1 = this.AllProducts.filter(product => product.productId > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          this.filteredData1 = this.AllProducts.filter(product => product.productId < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          this.filteredData1 = this.AllProducts.filter(product => product.productId === parseInt(filter.filterValue1, 10));
        } else {
          console.log('Error in ProductId Filtering');
        } // Product Name
      } else if (filter.option1 === 'productName') {
         this.filteredData1 = this.AllProducts.filter(product => product.productName === filter.filterValue1);
        // Full Price
      } else if (filter.option1 === 'fullPrice') {
        if (filter.criteria1 === '>') {
          this.filteredData1 = this.AllProducts.filter(product => product.fullPrice > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          this.filteredData1 = this.AllProducts.filter(product => product.fullPrice < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          this.filteredData1 = this.AllProducts.filter(product => product.fullPrice === parseFloat(filter.filterValue1));
        } else {
          console.log('Error in fullPrice Filtering');
        } // Sale Price
      } else if (filter.option1 === 'salePrice') {
        if (filter.criteria1 === '>') {
          this.filteredData1 = this.AllProducts.filter(product => product.salePrice > filter.filterValue1);
        } else if (filter.criteria1 === '<') {
          this.filteredData1 = this.AllProducts.filter(product => product.salePrice < filter.filterValue1);
        } else if (filter.criteria1 === '==') {
          this.filteredData1 = this.AllProducts.filter(product => product.salePrice === parseFloat(filter.filterValue1));
        } else {
          console.log('Error in salePrice Filtering');
        } // Discount
      } else if (filter.option1 === 'discount') {
        if (filter.criteria1 === '>') {
          this.filteredData1 = this.AllProducts.filter(product => (product.discount * 100) > parseFloat(filter.filterValue1));
        } else if (filter.criteria1 === '<') {
          this.filteredData1 = this.AllProducts.filter(product => (product.discount * 100) < parseFloat(filter.filterValue1));
        } else if (filter.criteria1 === '==') {
          this.filteredData1 = this.AllProducts.filter(
            product => parseFloat((product.discount * 100).toPrecision(4))  ===  parseFloat(filter.filterValue1));
          console.log('I ran');
        } else {
          console.log('Error in Discount Filtering');
        } // Supplier Name
      } else if (filter.option1 === 'supplierName') {
          this.filteredData1 = this.AllProducts.filter(product => product.supplier.supplierName === filter.filterValue1);
        // Category
      } else if (filter.option1 === 'category') {
          this.filteredData1 = this.AllProducts.filter(product => product.category.categoryName === filter.filterValue1);
        // Availability
      } else if (filter.option1 === 'availability') {
          if (filter.filterValue1 === 'true') {
            this.filteredData1 = this.AllProducts.filter(product => product.availability === true);
          } else if (filter.filterValue1 === 'false') {
            this.filteredData1 = this.AllProducts.filter(product => product.availability === false);
          } else {
          console.log('Error in Availability Filtering');
        }
      }

      // assigning the filtered data to the variable that stores it
      this.filteredDataFinal = this.filteredData1;
    }

    // Assigning the filtered data to the dataSource
    this.dataSource.data = this.filteredDataFinal;

    console.log(this.AllProducts);
    console.log(filter);
    console.log(this.filteredData1);
    console.log(this.filteredData2);
    console.log(this.filteredData3);
    console.log(this.filteredDataFinal);
    console.log(this.dataSource);
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
  }

}
