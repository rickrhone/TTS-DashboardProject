import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  public API = '//localhost:8080'; // saves the base URL to a variable
  public GET_CATEGORIES = this.API + '/categories'; // API to get all categories
  public UPDATE_CATEGORY = this.API + '/putcategories/'; // API to update a category
  public CREATE_CATEGORY = this.API + '/postcategory'; // API to post (add) a new category
  public DELETE_CATEGORY = this.API + '/deletecategories/'; // API to delete a category


  constructor(private http: HttpClient) {} // allows the app to take in a http address

  // ---------------------------------------- METHODS ------------------------------------------

  // Method to get all the categories made available by the API
  getAll(): Observable<any> {
    return this.http.get(this.GET_CATEGORIES); // goes to the categories API and get everything listed there
  }

  // Method to get a category by ID and return it
  get(id: string): Observable<any>  {
    return this.http.get(this.GET_CATEGORIES + '/' + id);
  }

  // Method to save to the database
  postCategory(formData: Categories) {
        console.log('I am in the postCategory Method');
        console.log(formData);
        return this.http.post(this.CREATE_CATEGORY, formData);
  }

  // Method to get all categories and store them in a list
  refreshList() {
    this.http.get(this.GET_CATEGORIES).toPromise().then(result => this.list = result as Categories[]);
  }

  // Method to update a category in the database
  putCategory(formData: Categories): Observable<any>  {
    console.log(formData);
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
