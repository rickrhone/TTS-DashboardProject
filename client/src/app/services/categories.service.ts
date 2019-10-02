import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Categories} from '../components/categories/categories.model';


@Injectable({
  providedIn: 'root'
})

// Contains attributes and methods to be shared among the Categories and EditAdd Categories components
export class CategoriesService {

  // creating a attribute to store the data to be shared between the categories edit form and table
  formData: Categories; // creates and object from the Categories model
  list: Categories[]; // list to store categories
  listAll: Categories[]; // list to store all categories non pageable
  numOfCategories: number; // variable to store the number of categories in the database
  totalNumOfPages: number; // variable to store the number of pages the data from the database is split among
  currentPageNum: number; // variable to store the current page
  currentNumOfElements: number; // variable to store the current number of elements to display per page.


  public API = '//localhost:8080'; // saves the base URL to a variable
  public GET_CATEGORIES_NON_PAGEABLE = this.API + '/categories'; // API to get all categories non pageable
  public GET_CATEGORIES = this.API + '/categoriesByPage'; // API to get all categories
  public UPDATE_CATEGORY = this.API + '/putcategory/'; // API to update a category
  public CREATE_CATEGORY = this.API + '/postcategory'; // API to post (add) a new category
  public DELETE_CATEGORY = this.API + '/deletecategory/'; // API to delete a category


  constructor(private http: HttpClient) {} // allows the app to take in a http address

  // ---------------------------------------- METHODS ------------------------------------------

  // ****************** GET METHODS ***************

  // Method to get all the categories made available by the API
  // getAll() { // goes to the categories API and get everything listed there
  //  this.http.get<any>(this.GET_CATEGORIES).subscribe(result => {
  //     return this.listAll = result.content;
  //   });
  // }

  // Method to get all the categories made available by the API without pagination
  getAll(): Observable<Categories[]> { // goes to the categories API and get everything listed there
    return this.http.get<any>(this.GET_CATEGORIES_NON_PAGEABLE);
  }

  // Method to get a category by ID and return it
  get(id: string): Observable<any>  {
    return this.http.get(this.GET_CATEGORIES + '/' + id);
  }

  // Method to get all categories and store them in a list
  // refreshList() {
  //   this.http.get(this.GET_CATEGORIES).toPromise().then(result => this.list = result as Categories[]);
  // }

  // Method to get all categories and store them in a list - Pageable
  // refreshList() {
  //   this.http.get<any>(this.GET_CATEGORIES).subscribe(result => {
  //     return this.list = result.content;
  //   });
  // }

  // Method to get all categories and store them in a list - Pageable with Parameters
   refreshList(params?: HttpParams) {
    console.log('------Inside refreshList()----');
    console.log('refreshList Page Num at the start:' + this.currentPageNum);

    this.http.get<any>(this.GET_CATEGORIES, {params}).subscribe(result => {
      return this.list = result.content;
    });
    console.log('refreshList Page Num at the End:' + this.currentPageNum);
  }

  // Method to get the Total Number of categories
  getTotalNumCategories(params?: HttpParams) {
    this.http.get<any>(this.GET_CATEGORIES, {params}).subscribe(result => {
      return this.numOfCategories = result.totalElements;
    });
  }

  // Method to get the Total Number of Pages the data is split among
  getTotalNumPages(params?: HttpParams) {
    this.http.get<any>(this.GET_CATEGORIES, {params}).subscribe(result => {
      return this.totalNumOfPages = result.totalPages;
    });
  }

  // Method to get the Current Page Number
  getCurrentPage(params?: HttpParams) {
    this.http.get<any>(this.GET_CATEGORIES, {params}).subscribe(result => {
      return this.currentPageNum = result.number;
    });
  }

  // Method to get the Current number of elements to display per page
  getCurrentNumOfElementsPerPage(params?: HttpParams) {
    this.http.get<any>(this.GET_CATEGORIES, {params}).subscribe(result => {
      return this.currentNumOfElements = result.size;
    });
  }


  // ************* END OF GET METHODS ****************

  // Method to save to the database
  postCategory(formData: Categories) {
    return this.http.post(this.CREATE_CATEGORY, formData);
  }


  // Method to update a category in the database
  putCategory(formData: Categories): Observable<any>  {
    return this.http.put(this.UPDATE_CATEGORY + formData.categoryId, formData);
  }

  // Method to delete a category from the database
  deleteCategory(id: number) {
    return this.http.delete(this.DELETE_CATEGORY + id);
  }

  // Method to populate form with pre-existing data when the edit button is clicked
  populateForm(category: Categories) {
    this.formData = Object.assign({}, category);
  }
}
