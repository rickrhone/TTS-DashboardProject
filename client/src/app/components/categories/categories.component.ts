import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../services/categories.service';
import {ToastrService} from 'ngx-toastr';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

// Component for listing all the categories
export class CategoriesComponent implements OnInit {

  categories: Array<any>; // defines an array to store all categories

  // Attributes for Pagination
  pageNumToNavigateTo: number;
  numCatPerPageToSet: number;
  sortByWhatColumn: string;



  // Constructor that takes in the route,  router, the categories services and the ToastrService for CRUD Ops success messages
  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private categoriesService: CategoriesService,
              private toastr: ToastrService) { }


  // ---------------------------------------- METHODS ------------------------------------------

  // What should be loaded/executed on the initialization of this component
  ngOnInit() {
    //  Method to Get all categories and store them in a list
    this.categoriesService.refreshList();

    // Method to get Total Number of Categories in the database
    this.categoriesService.getTotalNumCategories();

    // Method to get Total Number of Pages
    this.categoriesService.getTotalNumPages();

    // Method to get the current Page number
    this.categoriesService.getCurrentPage();

    // Method to get the Current number of elements to display per page
    this.categoriesService.getCurrentNumOfElementsPerPage();
  }

  // Method to delete a category
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this category')) {
      this.categoriesService.deleteCategory(id).subscribe(result => {
        this.categoriesService.refreshList();
        this.toastr.warning('Category deleted successfully', 'Category Table'); // display this message on success
      });
    }
  }

  // **** PAGINATION METHODS ******

  // On the click of the NEXT PAGE Button
  nextPage() {
    // if the max page has not been reached
    if (this.categoriesService.currentPageNum < this.categoriesService.totalNumOfPages) {

      // Increment the current Page by 1 and assign it to the pageNumToNavigateTo
      this.pageNumToNavigateTo = (this.categoriesService.currentPageNum + 1);

      // Set the page number parameter to the next page
      const params = new HttpParams().set('pageNum', this.pageNumToNavigateTo.toString());

      // Get the content from the the next page
      this.categoriesService.refreshList(params);

      // get the Total Number of Pages
      this.categoriesService.getTotalNumPages(params);

      // increment the page number
      this.categoriesService.currentPageNum = this.categoriesService.currentPageNum + 1;

      // get the current Page number
      this.categoriesService.getCurrentPage(params);
    }
  }

  // On the click of the PREVIOUS Button
  previousPage() {
    if (this.categoriesService.currentPageNum > 0) {
      // Increment the current Page by 1 and assign it to the pageNumToNavigateTo
      this.pageNumToNavigateTo = (this.categoriesService.currentPageNum - 1);

      // Set the page number parameter to the next page
      const params = new HttpParams().set('pageNum', this.pageNumToNavigateTo.toString());

      // Get the content from the the next page
      this.categoriesService.refreshList(params);

      // get the Total Number of Pages
      this.categoriesService.getTotalNumPages(params);

      // increment the page number
      this.categoriesService.currentPageNum = this.categoriesService.currentPageNum + 1;

      // get the current Page number
      this.categoriesService.getCurrentPage(params);
    }
  }

  sortByCategoryName() {
    // store the current page so it can be displayed after sorting
    const currentPage = this.categoriesService.currentPageNum;

    // Set the sortBy parameter to the categoryName and the keep the page as is
    const params = new HttpParams().set('sortBy', 'categoryName')
      .set('pageNum', currentPage.toString());

    // Get the content sorted by category name
    this.categoriesService.refreshList(params);
  }

  sortByCategoryId() {
    // store the current page so it can be displayed after sorting
    const currentPage = this.categoriesService.currentPageNum;

    // Set the sortBy parameter to the categoryId and the keep the page as i
    const params = new HttpParams().set('sortBy', 'categoryId')
      .set('pageNum', currentPage.toString());

    // Get the content sorted by category Id
    this.categoriesService.refreshList(params);
  }

}
