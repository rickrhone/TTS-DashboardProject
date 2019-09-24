import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SuppliersService} from '../../services/suppliers.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {


  suppliers: Array<any>; // defines an array to store all suppliers


  // Constructor that takes in the route,  router and the suppliers services
  constructor(private route: ActivatedRoute,
              private router: Router,
              private suppliersService: SuppliersService) { }

  ngOnInit() {
    // on init get all the suppliers and store them in the suppliers array
    this.suppliersService.getAll().subscribe(data => {
      this.suppliers = data;
    });
  }

  gotoSuppliers() {
    this.router.navigate(['/suppliers']);
  }

  remove(href) {
    this.suppliersService.remove(href).subscribe(result => {
      this.gotoSuppliers();
    }, error => console.error(error));
  }


}
