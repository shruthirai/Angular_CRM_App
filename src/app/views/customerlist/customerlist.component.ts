import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})

export class CustomerlistComponent implements OnInit {
  customerList = [];
  
  constructor(private _customerSVC: CustomerService, private router: Router ) { }

  display= 'none'; // default 
  display1= 'none'; // default Contact Variable
  display2= 'none'; // default Customer Type Variable
  
  ngOnInit() {
    this._customerSVC.getCustomerList().subscribe((data) => {
      this.customerList = data;
    });
  }

  showDialog(){
    this.display = 'block';
  }

  /*  Contact Form */
  showContactDialog() {
    this.display1 = 'block';
  }

  /*  Customer Type Form */
  showCustomerTypeDialog() {
    this.display2 = 'block';
  }

  /* clicking close button in model, this will be called */
  openModalDialog(event) {
    this.display = event; // Set block css
  }

  /*  Contact Form */
  openContactModalDialog(event) {
    this.display1 = event; // Set block css
  }

  /*  Customer Type Form */
  openCustomerTypeModalDialog(event) {
    this.display2 = event; // Set block css
  }

  /*  Create Customer Form */
  addCustomer(event) {
    event.id = UUID.UUID();
    this.customerList.push(event);
    this._customerSVC.saveCustomer(event);
  }

  /*  Contact Form */
  addContact(event) {
    console.log(event)
    event.id = UUID.UUID();
    this._customerSVC.saveContact(event);
  }

  /*  Customer Type Form */
  addCustomerType(event) {
    event.id = UUID.UUID();
    this._customerSVC.saveCustomerType(event);
  }
}
