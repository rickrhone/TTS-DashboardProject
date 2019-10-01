import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../../services/categories.service';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {HttpParams} from '@angular/common/http';

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
    // if not (no category with id) then log to the console the message below and  and reset the form
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.categoriesService.get(id).subscribe((category: any) => {
          if (category) {
            this.category = category;
          } else {
            console.log(`Category with id '${id}' not found, returning to the categories table`);
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
    } else {
      // otherwise perform a put/update category
      this.updateRecord(form);
    }
  }

  // Method to insert a new category
  insertRecord(form: NgForm) {
    console.log('Inside insertRecord()');
    console.log('insertRecord Page Num at the start:' + this.categoriesService.currentPageNum);
    // store the last page
    const lastPage = this.categoriesService.totalNumOfPages - 1;

    // Post the changes from the form and navigate to the last page
    this.categoriesService.postCategory(form.value).subscribe(result => {
      this.toastr.success('Category inserted successfully', 'Category Table'); // display this message on success
      this.resetForm(form);
      // assign the last page as a parameter for the get request
      const params = new HttpParams().set('pageNum', lastPage.toString());
      this.categoriesService.getCurrentPage(params); // updates the current page to the last page
      this.categoriesService.currentPageNum = lastPage; // set the page to the last page
      this.categoriesService.refreshList(params); // Refresh the categories table
      this.categoriesService.currentPageNum = lastPage; // set the page to the last page
      console.log('insertRecord Page Num at the End:' + this.categoriesService.currentPageNum);
    }, error => console.error(error));
  }

  // Method to update an existing category
  updateRecord(form: NgForm) {
    // store the current page so it can be displayed after inserting
    const currentPage = this.categoriesService.currentPageNum;

    // put the changes from the form
    this.categoriesService.putCategory(form.value).subscribe(result => {
      this.toastr.info('Category updated successfully', 'Category Table'); // display this message on success
      this.resetForm(form); // reset the form
      // assign the current page as a parameter for the get request
      const params = new HttpParams().set('pageNum', currentPage.toString());
      this.categoriesService.refreshList(params); // Refresh the categories table
      this.categoriesService.getCurrentPage(params); // updates the current page
      this.categoriesService.currentPageNum = currentPage; // sets the current page to the page the insert was initiated from

    }, error => console.error(error));
  }

}
