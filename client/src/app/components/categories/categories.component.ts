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
  pageNumToNavigateTo: string;
  numCatPerPageToSet: string;
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
    // if the max page has not been reached increment the current Page by 1 and assign it to the pageNumToNavigateTo
    if (this.categoriesService.currentPageNum < this.categoriesService.totalNumOfPages) {
      this.pageNumToNavigateTo = (this.categoriesService.currentPageNum + 1).toString();
      this.numCatPerPageToSet = '10'; // default value
      this.sortByWhatColumn = 'categoryId';
      // attribute to store the Parameters(page#, size, sort by) of the get method
      const params = new HttpParams()
        .set('pageNum', this.pageNumToNavigateTo)
        .set('numCatPerPage', this.numCatPerPageToSet)
        .set('sortBy', this.sortByWhatColumn);

      console.log(this.pageNumToNavigateTo);
      console.log('I am inside the nextPage() method right before the refreshList(withParam) executes');
      console.log(params.toString());
      this.categoriesService.refreshList(params);
      console.log('refreshList(withParam) has executed');
      console.log(params.toString());
      console.log(this.pageNumToNavigateTo);
    }
  }

  // On the click of the PREVIOUS Button
  previousPage() {
    // if current page is not 0 decrement the current Page by 1 and assign it to the page to be called
    if (this.categoriesService.currentPageNum > 0) {
      this.pageNumToNavigateTo = (this.categoriesService.currentPageNum - 1).toString();
      console.log('I am inside the previousPage() method right before the refreshList(withParam) executes');

      // this.categoriesService.refreshList(params);
      console.log('refreshList(withParam) has executed');

    }
  }



}
