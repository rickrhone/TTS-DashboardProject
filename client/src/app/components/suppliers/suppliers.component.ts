import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SuppliersService } from "../../services/suppliers.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-suppliers",
  templateUrl: "./suppliers.component.html",
  styleUrls: ["./suppliers.component.css"]
})
export class SuppliersComponent implements OnInit {
  suppliers: Array<any>; // defines an array to store all suppliers
  direction: string = "ASC"; // Stores the sorting direction

  // Attributes for Pagination
  pageNumToNavigateTo: number;

  // Constructor that takes in the route,  router, the suppliers services and the ToastrService for CRUD Ops success messages
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private suppliersService: SuppliersService,
    private toastr: ToastrService
  ) {}

  // ---------------------------------------- METHODS ------------------------------------------

  // What should be loaded/executed on the initialization of this component
  ngOnInit() {
    // Method to get the current Page number
    this.suppliersService.getCurrentPage();

    // Method to get Total Number of Suppliers in the database
    this.suppliersService.getTotalNumSuppliers();

    // Method to get Total Number of Pages
    this.suppliersService.getTotalNumPages();

    // Method to get the Current number of elements to display per page
    this.suppliersService.getCurrentNumOfElementsPerPage();

    //  Method to Get all suppliers and store them in a list
    this.suppliersService.refreshList();
  }

  // Method to delete a supplier
  onDelete(id: number) {
    if (confirm("Are you sure you want to delete this supplier?")) {
      this.suppliersService.deleteSupplier(id).subscribe(result => {
        // store the current page so it can be displayed after sorting
        const currentPage = this.suppliersService.currentPageNum;

        // the keep the page as is
        const params = new HttpParams().set("pageNum", currentPage.toString());
        this.suppliersService.refreshList(params); // refresh the current page
        this.suppliersService.getTotalNumSuppliers(); // updated supplier count data/etc.
        this.toastr.warning("Supplier deleted successfully", "Supplier Table"); // display this message on success
      });
    }
  }

  // **** PAGINATION METHODS ******

  // On the click of the NEXT PAGE Button
  nextPage() {
    // if the max page has not been reached
    if (
      this.suppliersService.currentPageNum <
      this.suppliersService.totalNumOfPages
    ) {
      // Increment the current Page by 1 and assign it to the pageNumToNavigateTo
      this.pageNumToNavigateTo = this.suppliersService.currentPageNum + 1;

      // Set the page number parameter to the next page
      const params = new HttpParams().set(
        "pageNum",
        this.pageNumToNavigateTo.toString()
      );

      // get the current Page number
      this.suppliersService.getCurrentPage(params);

      // increment the page number
      this.suppliersService.currentPageNum =
        this.suppliersService.currentPageNum + 1;

      // Get the content from the the next page
      this.suppliersService.refreshList(params);

      // get the Total Number of Pages
      this.suppliersService.getTotalNumPages(params);
    }
  }

  // On the click of the PREVIOUS Button
  previousPage() {
    if (this.suppliersService.currentPageNum > 0) {
      // Increment the current Page by 1 and assign it to the pageNumToNavigateTo
      this.pageNumToNavigateTo = this.suppliersService.currentPageNum - 1;

      // Set the page number parameter to the next page
      const params = new HttpParams().set(
        "pageNum",
        this.pageNumToNavigateTo.toString()
      );

      // get the current Page number
      this.suppliersService.getCurrentPage(params);

      // increment the page number
      this.suppliersService.currentPageNum =
        this.suppliersService.currentPageNum - 1;

      // Get the content from the the next page
      this.suppliersService.refreshList(params);

      // get the Total Number of Pages
      this.suppliersService.getTotalNumPages(params);
    }
  }

  sortBySupplierName() {
    // store the current page so it can be displayed after sorting
    const currentPage = this.suppliersService.currentPageNum;

    // Toggle the sorting direction
    if (this.direction === "DESC") {
      this.direction = "ASC";
    } else {
      this.direction = "DESC";
    }

    // Set the sortBy parameter to the supplierName and the keep the page as is
    const params = new HttpParams()
      .set("sortBy", "supplierName")
      .set("pageNum", currentPage.toString())
      .set("direction", this.direction);

    // Get the content sorted by supplier name
    this.suppliersService.refreshList(params);
  }

  sortBySupplierId() {
    // store the current page so it can be displayed after sorting
    const currentPage = this.suppliersService.currentPageNum;

    // Toggle the sorting direction
    if (this.direction === "DESC") {
      this.direction = "ASC";
    } else {
      this.direction = "DESC";
    }

    // Set the sortBy parameter to the supplierId and the keep the page as is
    const params = new HttpParams()
      .set("sortBy", "supplierId")
      .set("pageNum", currentPage.toString())
      .set("direction", this.direction);

    // Get the content sorted by supplier Id
    this.suppliersService.refreshList(params);
  }
}
