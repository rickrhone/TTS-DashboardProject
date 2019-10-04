import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgForm } from "@angular/forms";
import { SuppliersService } from "../../../services/suppliers.service";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-edit-add-suppliers",
  templateUrl: "./edit-add-suppliers.component.html",
  styleUrls: ["./edit-add-suppliers.component.css"]
})

// Component for inserting/creating and editing/updating suppliers
export class EditAddSuppliersComponent implements OnInit, OnDestroy {
  supplier: any = {}; // declares and initializes an empty array of suppliers
  sub: Subscription; // declares a variable name sub of type Subscription

  // Constructor that takes in the route,  router, the suppliers services and the ToastrService for CRUD Ops success messages
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suppliersService: SuppliersService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Reset the form
    this.resetForm();

    // Method to store data for auto populating form
    // on initialization check to see if supplier with IDs exists if so
    // call the get() supplier by id method in the service and for each supplier
    // store that supplier in the supplier array along with it's href (URI containing id)
    // if not (no supplier with id) then log to the console the message below and reset the form
    this.sub = this.route.params.subscribe(params => {
      const id = params["id"];
      if (id) {
        this.suppliersService.get(id).subscribe((supplier: any) => {
          if (supplier) {
            this.supplier = supplier;
          } else {
            console.log(
              `Supplier with id '${id}' not found, returning to the suppliers table`
            );
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
  resetForm(form?: NgForm) {
    // form can be nullable
    if (form != null) {
      form.resetForm();
    } // if the form is not null then call the reset function
    this.suppliersService.formData = {
      supplierId: null, // default id is null
      supplierName: "" // default name is empty string
    };
  }

  // What happens when form is submitted
  onSubmit(form: NgForm) {
    // if the id is null perform a post/create new supplier
    if (form.value.supplierId == null) {
      this.insertRecord(form);
    } else {
      // otherwise perform a put/update supplier
      this.updateRecord(form);
    }
  }

  // Method to insert a new supplier
  insertRecord(form: NgForm) {
    // store the last page
    const lastPage = this.suppliersService.totalNumOfPages - 1;

    // Post the changes from the form and navigate to the last page
    this.suppliersService.postSupplier(form.value).subscribe(
      result => {
        this.toastr.success("Supplier inserted successfully", "Supplier Table"); // display this message on success
        this.resetForm(form);
        // assign the last page as a parameter for the get request
        const params = new HttpParams().set("pageNum", lastPage.toString());
        this.suppliersService.getCurrentPage(params); // updates the current page to the last page
        this.suppliersService.currentPageNum = lastPage; // set the page to the last page
        this.suppliersService.refreshList(params); // Refresh the suppliers table
        // this.suppliersService.currentPageNum = lastPage; // set the page to the last page
      },
      error => console.error(error)
    );
  }

  // Method to update an existing supplier
  updateRecord(form: NgForm) {
    // store the current page so it can be displayed after inserting
    const currentPage = this.suppliersService.currentPageNum;

    // put the changes from the form
    this.suppliersService.putSupplier(form.value).subscribe(
      result => {
        this.toastr.info("Supplier updated successfully", "Supplier Table"); // display this message on success
        this.resetForm(form); // reset the form
        // assign the current page as a parameter for the get request
        const params = new HttpParams().set("pageNum", currentPage.toString());
        this.suppliersService.refreshList(params); // Refresh the suppliers table
        this.suppliersService.getCurrentPage(params); // updates the current page
        this.suppliersService.currentPageNum = currentPage; // sets the current page to the page the insert was initiated from
      },
      error => console.error(error)
    );
  }
}
