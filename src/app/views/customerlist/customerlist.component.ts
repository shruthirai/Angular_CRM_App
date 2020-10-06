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

  display= 'none'; // default Variable

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
  openModalDialog(event) {
    this.display = event; // Set block css
 }

 addCustomer(event) {
   console.log("EEEEEEEEEEE");
   event.id = UUID.UUID();
   this.customerList.push(event);
   this._customerSVC.saveCustomer(event);
 }
}
