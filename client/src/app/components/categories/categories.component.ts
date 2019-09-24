import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

categories: Array<any>; // defines an array to store all categories


  // Constructor that takes in the route,  router and the categories services
  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoriesService: CategoriesService) { }

  ngOnInit() {
    // on init get all the categories and store them in the categories array
    this.categoriesService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  gotoCategories() {
    this.router.navigate(['/categories']);
  }

  remove(href) {
    this.categoriesService.remove(href).subscribe(result => {
      this.gotoCategories();
    }, error => console.error(error));
  }

}
