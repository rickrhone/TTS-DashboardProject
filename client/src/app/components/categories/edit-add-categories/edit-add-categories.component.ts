import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../../services/categories.service';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Categories} from '../categories.model';

@Component({
  selector: 'app-edit-add-categories',
  templateUrl: './edit-add-categories.component.html',
  styleUrls: ['./edit-add-categories.component.css']
})

// Component for inserting/creating and editing/updating categories
export class EditAddCategoriesComponent implements OnInit, OnDestroy {

  category: any = {}; // declares and initializes an empty array of categories
  sub: Subscription;  // declares a variable name sub of type Subscription


  // Constructor that takes in the route,  router, the categories services and the ToastrService for CRUD Ops success messages
  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoriesService: CategoriesService,
              private toastr: ToastrService) {}

  ngOnInit() {

    console.log('Edit-Add Categories Form is Open');
    // Reset the form
    this.resetForm();

    // Method to store data for auto populating form
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
          } else {
            console.log(`Category with id '${id}' not found, returning to categories table`);
            this.resetForm();
          }
        });
      }
    });
  }

  // ---------------------------------------- METHODS ------------------------------------------

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Method to reset the form
  resetForm(form?: NgForm) { // form can be nullable
    if (form != null) { form.resetForm(); } // if the form is not null then call the reset function
    this.categoriesService.formData = {
      categoryId : null,  // default id is null
      categoryName : '' // default name is empty string
    };
  }

  // What happens when form is submitted
  onSubmit(form: NgForm) {
    // if the id is null perform a post/create new category
    if (form.value.categoryId == null) {
      this.insertRecord(form);
      this.categoriesService.refreshList(); // Refresh the categories table
      this.categoriesService.getTotalNumCategories(); // updated category count data/etc.
    } else {
      console.log('I am in the onSubmit Method and I am updating an existing record');
      // otherwise perform a put/update category
      this.updateRecord(form);
      this.categoriesService.refreshList(); // Refresh the categories table
    }
  }

  // Method to insert a new category
  insertRecord(form: NgForm) {
    this.categoriesService.postCategory(form.value).subscribe(result => {
      this.toastr.success('Category inserted successfully', 'Category Table'); // display this message on success
      this.resetForm(form);
      this.categoriesService.refreshList(); // Refresh the categories table
    }, error => console.error(error));
  }

  // Method to update an existing category
  updateRecord(form: NgForm) {
    console.log('I am in the updateRecord method');
    this.categoriesService.putCategory(form.value).subscribe(result => {
      this.toastr.info('Category updated successfully', 'Category Table'); // display this message on success
      this.resetForm(form);
      this.categoriesService.refreshList(); // Refresh the categories table
    }, error => console.error(error));
  }

}
