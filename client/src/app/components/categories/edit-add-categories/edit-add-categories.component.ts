import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../../services/categories.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-add-categories',
  templateUrl: './edit-add-categories.component.html',
  styleUrls: ['./edit-add-categories.component.css']
})
export class EditAddCategoriesComponent implements OnInit, OnDestroy {

  category: any = {}; // declares and initializes an empty array of categories
  sub: Subscription;  // declares a variable name sub of type Subscription


  // Constructor that takes in the route,  router and the catrgories services
  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoriesService: CategoriesService) { }

  ngOnInit() {

    // on initialization check to see if category with IDs exists if so
    // call the get() category by id method in the service and for each category
    // store that category in the category array along with it's href (URI containing id)
    // if not (no category with id) then log to the console the message below and navigate to category table via the gotoCategories method
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.categoriesService.get(id).subscribe((category: any) => {
          if (category) {
            this.category = category;
            this.category.href = category._links.self.href;
          } else {
            console.log(`Category with id '${id}' not found, returning to categories table`);
            this.gotoCategories();
          }
        });
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoCategories() {
    this.router.navigate(['/categories']);
  }

  save(form: NgForm) {
    this.categoriesService.save(form).subscribe(result => {
      this.gotoCategories();
    }, error => console.error(error));
  }

}
