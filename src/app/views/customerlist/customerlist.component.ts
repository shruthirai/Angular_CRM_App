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
      this.customerList = data.json();

    });
  }

  showDialog(){
    this.display = 'block';
  }
  openModalDialog(event) {
    this.display = event; // Set block css
 }

 addCustomer(event) {
   event.id = UUID.UUID();
   this.customerList.push(event);
 }

 activateDactivate(item) {
   this.customerList.filter((data => {
     if (data.id === item.id) {
      if (item.status !== 'active' ) {
        data.status = 'active';
      } else {
        data.status =  'inactive';
      }
     }
   }));
   return item.status !== 'active' ? 'active' : 'inactive';
 }
}
