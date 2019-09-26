import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../services/categories.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

// Component for listing all the categories
export class CategoriesComponent implements OnInit {

  categories: Array<any>; // defines an array to store all categories


  // Constructor that takes in the route,  router, the categories services and the ToastrService for CRUD Ops success messages
  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoriesService: CategoriesService,
              private toastr: ToastrService) { }

  ngOnInit() {
    // on init get all the categories and store them in the categories array
    // this.categoriesService.getAll().subscribe(data => {
    //   this.categories = data;
    // });

    // ----- new method -------
    this.categoriesService.refreshList();
  }

  // ------------------- METHODS -------------------

  // gotoCategories() {
  //   this.router.navigate(['/categories']);
  // }


  // Method to delete a category
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this category')) {
      this.categoriesService.deleteCategory(id).subscribe(result => {
        this.categoriesService.refreshList();
        this.toastr.warning('Category deleted successfully', 'Category Table'); // display this message on success
      });
    }
  }


}
