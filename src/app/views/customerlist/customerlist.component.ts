import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
  customerList = [];
  isEdit = false;
  selectedId;
    constructor(private _customerSVC: CustomerService) { }
    editItem(item) {
      this.selectedId = item.id;
      this.isEdit = true;
    }

  cancel() {
    this.isEdit = false;
    this.selectedId = '';
  }

  save() {
    this.isEdit = false;
    this.selectedId = '';
  }

  deleteItem(i) {
    this.customerList.splice(i, 1);
  }

  display= 'none'; // default 
  display1= 'none'; // default Contact Variable
  

  ngOnInit() {
    this._customerSVC.getCustomerList().subscribe((data) => {
      //this.customerList = data.json();
      this.customerList = data.customer;
      console.log(this.customerList);
    });
  }

  showDialog(){
    this.display = 'block';
  }

  /*  Contact Form */
  showContactDialog() {
    this.display1 = 'block';
  }

  /* clicking close button in model, this will be called */
  openModalDialog(event) {
    this.display = event; // Set block css
  }

  /*  Contact Form */
  openContactModalDialog(event) {
    this.display1 = event; // Set block css
  }

  addCustomer(event) {
   event.id = UUID.UUID();
   this.customerList.push(event);
   this._customerSVC.saveCustomer(event);
  }

  /*  Contact Form */
  addContact(event) {
   event.id = UUID.UUID();
   this.customerList.push(event);
   //this._customerSVC.saveContact(event);
  }
}
