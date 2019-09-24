import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public API = '//localhost:8080'; // saves the base URL to a variable
  public CATEGORIES_API = this.API + '/categories'; // saves the endpoint for categories to a variable

  constructor(private http: HttpClient) { } // allows the app to take in a http address

  // Method to get all the products made available by the API
  getAll(): Observable<any> {
    return this.http.get(this.CATEGORIES_API); // goes to the categories API and get everything listed there
  }

  // Method to get a product by ID and return it
  get(id: string) {
    return this.http.get(this.CATEGORIES_API + '/' + id);
  }

  // Method to save a new product to the repo
  save(category: any): Observable<any> {
    let result: Observable<Object>;
    if (category['href']) { // if the category already has an href then perform a put/update
      result = this.http.put(category.href, category); // but the updated category at the existing href
    } else { // if the car does not have an href then post/create car at the url
      result = this.http.post(this.CATEGORIES_API, category);
    }
    return result;
  }

  // Method to delete a category from the database
  remove(href: string) {
    return this.http.delete(href);
  }

}
