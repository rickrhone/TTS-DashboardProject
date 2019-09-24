import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  public API = '//localhost:8080'; // saves the base URL to a variable
  public SUPPLIERS_API = this.API + '/suppliers'; // saves the endpoint for suppliers to a variable

  constructor(private http: HttpClient) { } // allows the app to take in a http address

  // Method to get all the suppliers made available by the API
  getAll(): Observable<any> {
    return this.http.get(this.SUPPLIERS_API); // goes to the suppliers API and get everything listed there
  }

  // Method to get a supplier by ID and return it
  get(id: string) {
    return this.http.get(this.SUPPLIERS_API + '/' + id);
  }

  // Method to save a new supplier to the repo
  save(supplier: any): Observable<any> {
    let result: Observable<Object>;
    if (supplier['href']) { // if the supplier already has an href then perform a put/update
      result = this.http.put(supplier.href, supplier); // but the updated supplier at the existing href
    } else { // if the car does not have an href then post/create car at the url
      result = this.http.post(this.SUPPLIERS_API, supplier);
    }
    return result;
  }

  // Method to delete a supplier from the database
  remove(href: string) {
    return this.http.delete(href);
  }

}
