import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Products} from '../components/products/products.model';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  // creating a attribute to store the data to be shared between the Products edit form and table
  formData: Products; // creates and object from the products model
  list: Products[]; // list to store products
  numOfProducts: number; // variable to store the number of products in the database
  totalNumOfPages: number; // variable to store the number of pages the data from the database is split among
  currentPageNum: number; // variable to store the current page
  currentNumOfElements: number; // variable to store the current number of elements to display per page.

  public API = '//localhost:8080'; // saves the base URL to a variable
  public GET_PRODUCTS = this.API + '/productsByPage'; // API to get all products
  public UPDATE_PRODUCT = this.API + '/putproduct/'; // API to update a product
  public CREATE_PRODUCT = this.API + '/postproduct'; // API to post (add) a new product
  public DELETE_PRODUCT = this.API + '/deleteproduct/'; // API to delete a product

  constructor(private http: HttpClient) { } // allows the app to take in a http address

  // ---------------------------------------- METHODS ------------------------------------------

  // ****************** GET METHODS ***************

  // Method to get all the products made available by the API
  getAll(): Observable<any> {
    return this.http.get(this.GET_PRODUCTS); // goes to the products API and get everything listed there
  }

  // Method to get a product by ID and return it
  get(id: string): Observable<any>  {
    return this.http.get(this.GET_PRODUCTS + '/' + id);
  }

  // Method to get all products and store them in a list - Pageable with Parameters
  refreshList(params?: HttpParams) {
    console.log('------Inside refreshList()----');
    console.log('refreshList Page Num at the start:' + this.currentPageNum);

    this.http.get<any>(this.GET_PRODUCTS, {params}).subscribe(result => {
      return this.list = result.content;
    });
    console.log('refreshList Page Num at the End:' + this.currentPageNum);
  }

  // Method to get the Total Number of products
  getTotalNumProducts(params?: HttpParams) {
    this.http.get<any>(this.GET_PRODUCTS, {params}).subscribe(result => {
      return this.numOfProducts = result.totalElements;
    });
  }

  // Method to get the Total Number of Pages the data is split among
  getTotalNumPages(params?: HttpParams) {
    this.http.get<any>(this.GET_PRODUCTS, {params}).subscribe(result => {
      return this.totalNumOfPages = result.totalPages;
    });
  }

  // Method to get the Current Page Number
  getCurrentPage(params?: HttpParams) {
    this.http.get<any>(this.GET_PRODUCTS, {params}).subscribe(result => {
      return this.currentPageNum = result.number;
    });
  }

  // Method to get the Current number of elements to display per page
  getCurrentNumOfElementsPerPage(params?: HttpParams) {
    this.http.get<any>(this.GET_PRODUCTS, {params}).subscribe(result => {
      return this.currentNumOfElements = result.size;
    });
  }


  // ************* END OF GET METHODS ****************

  // Method to save to the database
  postProduct(formData: Products) {
    return this.http.post(this.CREATE_PRODUCT, formData);
  }

  // Method to update a product in the database
  putProduct(formData: Products): Observable<any>  {
    return this.http.put(this.UPDATE_PRODUCT + formData.productId, formData);
  }

  // Method to delete a product from the database
  deleteProduct(id: number) {
    return this.http.delete(this.DELETE_PRODUCT + id);
  }

  // Method to populate form with pre-existing data when the edit button is clicked
  populateForm(product: Products) {
    this.formData = Object.assign({}, product);
  }


}
