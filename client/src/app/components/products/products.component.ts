import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<any>; // defines an array to store all products in
  direction: string = 'ASC'; // Stores the sorting direction

  // Attributes for Pagination
  pageNumToNavigateTo: number;

  // Constructor that takes in the route,  router, the products services and the ToastrService for CRUD Ops success messages
  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private productsService: ProductsService,
              private toastr: ToastrService) { }

  // ---------------------------------------- METHODS ------------------------------------------
  // What should be loaded/executed on the initialization of this component
  ngOnInit() {
    // Method to get the current Page number
    this.productsService.getCurrentPage();

    console.log('OnInit Page Num at the start:' + this.productsService.currentPageNum);

    // Method to get Total Number of Products in the database
    this.productsService.getTotalNumProducts();

    // Method to get Total Number of Pages
    this.productsService.getTotalNumPages();

    // Method to get the Current number of elements to display per page
    this.productsService.getCurrentNumOfElementsPerPage();

    //  Method to Get all categories and store them in a list
    this.productsService.refreshList();

  }

  // Method to delete a product
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(id).subscribe(result => {
        // store the current page so it can be displayed after sorting
        const currentPage = this.productsService.currentPageNum;

        // the keep the page as is
        const params = new HttpParams().set('pageNum', currentPage.toString());
        this.productsService.refreshList(params); // refresh the current page
        this.productsService.getTotalNumProducts(); // updated product count data/etc.
        this.toastr.warning('Product deleted successfully', 'Product Table'); // display this message on success
      });
    }
  }

  // **** PAGINATION METHODS ******

  // On the click of the NEXT PAGE Button
  nextPage() {
    console.log('-----Inside nextPage()----');
    console.log('nextPage Page Num at the start:' + this.productsService.currentPageNum);
    // if the max page has not been reached
    if (this.productsService.currentPageNum < this.productsService.totalNumOfPages) {

      // Increment the current Page by 1 and assign it to the pageNumToNavigateTo
      this.pageNumToNavigateTo = (this.productsService.currentPageNum + 1);

      // Set the page number parameter to the next page
      const params = new HttpParams().set('pageNum', this.pageNumToNavigateTo.toString());

      // get the current Page number
      this.productsService.getCurrentPage(params);

      // increment the page number
      this.productsService.currentPageNum = this.productsService.currentPageNum + 1;

      // Get the content from the the next page
      this.productsService.refreshList(params);

      // get the Total Number of Pages
      this.productsService.getTotalNumPages(params);

      console.log('NextPage Page Num at the End:' + this.productsService.currentPageNum);
    }
  }

  // On the click of the PREVIOUS Button
  previousPage() {
    console.log('-----Inside previousPage()----');
    console.log('previousPage Page Num at the start:' + this.productsService.currentPageNum);
    if (this.productsService.currentPageNum > 0) {
      // Increment the current Page by 1 and assign it to the pageNumToNavigateTo
      this.pageNumToNavigateTo = (this.productsService.currentPageNum - 1);

      // Set the page number parameter to the next page
      const params = new HttpParams().set('pageNum', this.pageNumToNavigateTo.toString());

      // get the current Page number
      this.productsService.getCurrentPage(params);

      // increment the page number
      this.productsService.currentPageNum = this.productsService.currentPageNum - 1;

      // Get the content from the the next page
      this.productsService.refreshList(params);

      // get the Total Number of Pages
      this.productsService.getTotalNumPages(params);


      console.log('previousPage Page Num at the End:' + this.productsService.currentPageNum);
    }
  }

  // -------- SORTING METHODS -------

  sortByProductId() {
    // store the current page so it can be displayed after sorting
    const currentPage = this.productsService.currentPageNum;

    // Toggle the sorting direction
    if (this.direction === 'DESC') {
      this.direction = 'ASC';
    } else {
      this.direction = 'DESC';
    }

    // Set the sortBy parameter to the categoryId and the keep the page as i
    const params = new HttpParams().set('sortBy', 'productId')
      .set('pageNum', currentPage.toString())
      .set('direction', this.direction);

    // Get the content sorted by category Id
    this.productsService.refreshList(params);
  }

  sortByProductName() {
    // store the current page so it can be displayed after sorting
    const currentPage = this.productsService.currentPageNum;

    // Toggle the sorting direction
    if (this.direction === 'DESC') {
      this.direction = 'ASC';
    } else {
      this.direction = 'DESC';
    }

    // Set the sortBy parameter to the categoryName and the keep the page as is
    const params = new HttpParams().set('sortBy', 'productName')
      .set('pageNum', currentPage.toString())
      .set('direction', this.direction);

    // Get the content sorted by category name
    this.productsService.refreshList(params);
  }

  sortByCategory() {
    // store the current page so it can be displayed after sorting
    const currentPage = this.productsService.currentPageNum;

    // Toggle the sorting direction
    if (this.direction === 'DESC') {
      this.direction = 'ASC';
    } else {
      this.direction = 'DESC';
    }

    // Set the sortBy parameter to the category and the keep the page as is
    const params = new HttpParams().set('sortBy', 'category')
      .set('pageNum', currentPage.toString())
      .set('direction', this.direction);

    // Get the content sorted by category
    this.productsService.refreshList(params);
  }

  sortByFullPrice() {
    // store the current page so it can be displayed after sorting
    const currentPage = this.productsService.currentPageNum;

    // Toggle the sorting direction
    if (this.direction === 'DESC') {
      this.direction = 'ASC';
    } else {
      this.direction = 'DESC';
    }

    // Set the sortBy parameter to fullPrice and the keep the page as is
    const params = new HttpParams().set('sortBy', 'fullPrice')
      .set('pageNum', currentPage.toString())
      .set('direction', this.direction);

    // Get the content sorted by fullPrice
    this.productsService.refreshList(params);
  }

  sortBySalePrice() {
    // store the current page so it can be displayed after sorting
    const currentPage = this.productsService.currentPageNum;

    // Toggle the sorting direction
    if (this.direction === 'DESC') {
      this.direction = 'ASC';
    } else {
      this.direction = 'DESC';
    }

    // Set the sortBy parameter to salePrice and the keep the page as is
    const params = new HttpParams().set('sortBy', 'salePrice')
      .set('pageNum', currentPage.toString())
      .set('direction', this.direction);

    // Get the content sorted by salePrice
    this.productsService.refreshList(params);
  }

  sortByDiscount() {
    // store the current page so it can be displayed after sorting
    const currentPage = this.productsService.currentPageNum;

    // Toggle the sorting direction
    if (this.direction === 'DESC') {
      this.direction = 'ASC';
    } else {
      this.direction = 'DESC';
    }

    // Set the sortBy parameter to discount and the keep the page as is
    const params = new HttpParams().set('sortBy', 'discount')
      .set('pageNum', currentPage.toString())
      .set('direction', this.direction);

    // Get the content sorted by salePrice
    this.productsService.refreshList(params);
  }

  sortBySupplier() {
    // store the current page so it can be displayed after sorting
    const currentPage = this.productsService.currentPageNum;

    // Toggle the sorting direction
    if (this.direction === 'DESC') {
      this.direction = 'ASC';
    } else {
      this.direction = 'DESC';
    }

    // Set the sortBy parameter to supplier and the keep the page as is
    const params = new HttpParams().set('sortBy', 'supplier')
      .set('pageNum', currentPage.toString())
      .set('direction', this.direction);

    // Get the content sorted by supplier
    this.productsService.refreshList(params);
  }

  sortByAvailability() {
    // store the current page so it can be displayed after sorting
    const currentPage = this.productsService.currentPageNum;

    // Toggle the sorting direction
    if (this.direction === 'DESC') {
      this.direction = 'ASC';
    } else {
      this.direction = 'DESC';
    }

    // Set the sortBy parameter to availability and the keep the page as is
    const params = new HttpParams().set('sortBy', 'availability')
      .set('pageNum', currentPage.toString())
      .set('direction', this.direction);

    // Get the content sorted by availability
    this.productsService.refreshList(params);
  }
}
