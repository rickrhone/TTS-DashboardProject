import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductsService } from "../../../services/products.service";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { HttpParams } from "@angular/common/http";
import { Categories } from "../../categories/categories.model";
import { Suppliers } from "../../suppliers/suppliers.model";
import { SuppliersService } from "../../../services/suppliers.service";
import { CategoriesService } from "../../../services/categories.service";
import { Products } from "../products.model";

@Component({
  selector: "app-edit-add-products",
  templateUrl: "./edit-add-products.component.html",
  styleUrls: ["./edit-add-products.component.css"]
})

// Component for inserting/creating and editing/updating products
export class EditAddProductsComponent implements OnInit, OnDestroy {
  product: any = {}; // declares and initializes an empty array of products
  sub: Subscription; // declares a variable name sub of type Subscription
  AllCategories: Categories[]; // stores all the categories
  AllSuppliers: Suppliers[]; // stores all the suppliers
  formData: Products; // creates and object from the products model

  // attribute to store a blank category for FormReset.
  blankCategory: Categories = {
    categoryId: null,
    categoryName: "hi"
  };

  // attribute to store a blank supplier for FormReset.
  blankSupplier: Suppliers = {
    supplierId: null,
    supplierName: ""
  };

  // Constructor that takes in the route,  router and the product/supplier/category services
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private suppliersService: SuppliersService,
    private categoriesService: CategoriesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Method to get all the categories and assign it to the array of categories called AllCategories
    this.categoriesService.getAll().subscribe(result => {
      // gets the current list of all categories non-pageable
      this.AllCategories = result;
    });

    // Method to get all the suppliers and assign it to the array of suppliers called AllSuppliers
    this.suppliersService.getAll().subscribe(result => {
      // gets the current list of all suppliers non-pageable
      this.AllSuppliers = result;
    });

    // Reset the form
    this.resetForm();

    // on initialization check to see if products with IDs exists if so
    // call the get() product by id method in the service and for each product
    // store that product in the product array along with it's href (URI containing id)
    // if not (no product with id) then log to the console the message below and navigate to product table via the gotoProducts method
    this.sub = this.route.params.subscribe(params => {
      const id = params["id"];
      if (id) {
        this.productsService.get(id).subscribe((product: any) => {
          if (product) {
            this.product = product;
          } else {
            console.log(
              `Product with id '${id}' not found, returning to products table`
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
    this.productsService.formData = {
      productId: null, // default id is null
      productName: "", // default name is empty string
      category: this.blankCategory, // default category is empty object
      fullPrice: null, // default full price is null
      salePrice: null, // default sale price is null
      // discount: null, // default discount is null
      availability: false, // default availability is false
      supplier: this.blankSupplier // default supplier is empty object
    };
  }

  // What happens when form is submitted
  onSubmit(form: NgForm) {
    // if the id is null perform a post/create new supplier
    if (form.value.productId == null) {
      this.insertRecord(form);
    } else {
      // otherwise perform a put/update product
      this.updateRecord(form);
      this.productsService.enableForm = false; // rest enable form status
    }
  }

  // Method to insert a new product
  insertRecord(form: NgForm) {
    console.log("Inside insertRecord()");
    console.log(
      "insertRecord Page Num at the start:" +
        this.productsService.currentPageNum
    );
    // store the last page
    const lastPage = this.productsService.totalNumOfPages - 1;
    const CategoryKeyValue: any = {};
    this.AllCategories.forEach(cat => {
      // add a key value pair to the CategoryKeyValue Array
      CategoryKeyValue[cat.categoryName] = cat.categoryId;
      // console.log(cat)
    });

    const SupplierKeyValue: any = {};
    this.AllSuppliers.forEach(sup => {
      // add a key value pair to the supplierKeyValue Array
      SupplierKeyValue[sup.supplierName] = sup.supplierId;
    });

    // formatted form date
    const formattedFormData = {
      productId: this.productsService.addProdFormData.productId,
      productName: this.productsService.addProdFormData.productName,
      category: {
        categoryId:
          CategoryKeyValue[
            this.productsService.addProdFormData.category.categoryName
          ],
        categoryName: this.productsService.addProdFormData.category.categoryName
      },
      fullPrice: this.productsService.addProdFormData.fullPrice,
      salePrice: this.productsService.addProdFormData.salePrice,
      availability: this.productsService.addProdFormData.availability,
      supplier: {
        supplierId:
          SupplierKeyValue[
            this.productsService.addProdFormData.supplier.supplierName
          ],
        supplierName: this.productsService.addProdFormData.supplier.supplierName
      }
    };

    console.log(formattedFormData);

    // convert the form.value to a product
    // const newProd: Products = form.value;

    // console.log('Inside of insertRecord Method Start - CatId: ' + form.value.categoryId);

    // Post the changes from the form and navigate to the last page
    this.productsService.postProduct(formattedFormData).subscribe(
      result => {
        this.toastr.success("Product inserted successfully", "Product Table"); // display this message on success
        this.resetForm(form);
        // assign the last page as a parameter for the get request
        const params = new HttpParams().set("pageNum", lastPage.toString());
        this.productsService.getCurrentPage(params); // updates the current page to the last page
        this.productsService.currentPageNum = lastPage; // set the page to the last page
        this.productsService.refreshList(params); // Refresh the products table
        this.productsService.currentPageNum = lastPage; // set the page to the last page
        console.log(
          "insertRecord Page Num at the End:" +
            this.productsService.currentPageNum
        );

        // console.log('Inside of insertRecord Method End - CatId: ' +  this.productsService.formData.category.categoryId);
      },
      error => console.error(error)
    );
  }

  // Method to update an existing product
  updateRecord(form: NgForm) {
    // store the current page so it can be displayed after inserting
    const currentPage = this.productsService.currentPageNum;

    // put the changes from the form
    this.productsService.putProduct(form.value).subscribe(
      result => {
        this.toastr.info("Product updated successfully", "Product Table"); // display this message on success
        this.resetForm(form); // reset the form
        // assign the current page as a parameter for the get request
        const params = new HttpParams().set("pageNum", currentPage.toString());
        this.productsService.refreshList(params); // Refresh the products table
        this.productsService.getCurrentPage(params); // updates the current page
        this.productsService.currentPageNum = currentPage; // sets the current page to the page the insert was initiated from
      },
      error => console.error(error)
    );
  }
}
