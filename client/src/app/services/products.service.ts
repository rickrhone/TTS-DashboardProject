import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public API = '//localhost:8080'; // saves the base URL to a variable
  public PRODUCTS_API = this.API + '/products'; // saves the endpoint for products to a variable

  constructor(private http: HttpClient) { } // allows the app to take in a http address

  // Method to get all the products made available by the API
  getAll(): Observable<any> {
    return this.http.get(this.PRODUCTS_API); // goes to the products API and get everything listed there
  }

  // Method to get a product by ID and return it
  get(id: string) {
    return this.http.get(this.PRODUCTS_API + '/' + id);
  }

  // Method to save a new product to the repo
  save(product: any): Observable<any> {
    let result: Observable<Object>;
    if (product['href']) { // if the products already has an href then perform a put/update
      result = this.http.put(product.href, product); // but the updated product at the existing href
    } else { // if the car does not have an href then post/create car at the url
      result = this.http.post(this.PRODUCTS_API, product);
    }
    return result;
  }

  // Method to delete a product from the database
  remove(href: string) {
    return this.http.delete(href);
  }

}
