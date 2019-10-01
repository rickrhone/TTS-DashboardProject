import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Suppliers} from '../components/suppliers/suppliers.model';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

// creating a attribute to store the data to be shared between the suppliers edit form and table
  formData: Suppliers; // creates and object from the Suppliers model
  list: Suppliers[]; // list to store suppliers
  numOfSuppliers: number; // variable to store the number of suppliers in the database
  totalNumOfPages: number; // variable to store the number of pages the data from the database is split among
  currentPageNum: number; // variable to store the current page number
  currentNumOfElements: number; // variable to store the current number of elements to display per page.


  public API = '//localhost:8080'; // saves the base URL to a variable
  public GET_SUPPLIERS = this.API + '/suppliersByPage'; // API to get all suppliers
  public UPDATE_SUPPLIER = this.API + '/putsupplier/'; // API to update a suppliers
  public CREATE_SUPPLIER = this.API + '/postsupplier'; // API to post (add) a new supplier
  public DELETE_SUPPLIER = this.API + '/deletesupplier/'; // API to delete a supplier

  constructor(private http: HttpClient) {} // allows the app to take in a http address

  // ---------------------------------------- METHODS ------------------------------------------

  // ****************** GET METHODS ***************

  // Method to get all the suppliers made available by the API
  getAll(): Observable<any> {
    return this.http.get(this.GET_SUPPLIERS); // goes to the suppliers API and get everything listed there
  }

  // Method to get a supplier by ID and return it
  get(id: string): Observable<any>  {
    return this.http.get(this.GET_SUPPLIERS + '/' + id);
  }

  // Method to get all suppliers and store them in a list - Pageable with Parameters
  refreshList(params?: HttpParams) {
    this.http.get<any>(this.GET_SUPPLIERS, {params}).subscribe(result => {
      return this.list = result.content;
    });
  }

  // Method to get the Total Number of suppliers
  getTotalNumSuppliers(params?: HttpParams) {
    this.http.get<any>(this.GET_SUPPLIERS, {params}).subscribe(result => {
      return this.numOfSuppliers = result.totalElements;
    });
  }

  // Method to get the Total Number of Pages the data is split among
  getTotalNumPages(params?: HttpParams) {
    this.http.get<any>(this.GET_SUPPLIERS, {params}).subscribe(result => {
      return this.totalNumOfPages = result.totalPages;
    });
  }

  // Method to get the Current Page Number
  getCurrentPage(params?: HttpParams) {
    this.http.get<any>(this.GET_SUPPLIERS, {params}).subscribe(result => {
      return this.currentPageNum = result.number;
    });
  }

  // Method to get the Current number of elements to display per page
  getCurrentNumOfElementsPerPage(params?: HttpParams) {
    this.http.get<any>(this.GET_SUPPLIERS, {params}).subscribe(result => {
      return this.currentNumOfElements = result.size;
    });
  }


  // ************* END OF GET METHODS ****************

  // Method to save to the database
  postSupplier(formData: Suppliers) {
    return this.http.post(this.CREATE_SUPPLIER, formData);
  }

  // Method to update a supplier in the database
  putSupplier(formData: Suppliers): Observable<any>  {
    return this.http.put(this.UPDATE_SUPPLIER + formData.supplierId, formData);
  }

  // Method to delete a supplier from the database
  deleteSupplier(id: number) {
    return this.http.delete(this.DELETE_SUPPLIER + id);
  }

  // Method to populate form with pre-existing data when the edit button is clicked
  populateForm(supplier: Suppliers) {
    this.formData = Object.assign({}, supplier);
  }

}
