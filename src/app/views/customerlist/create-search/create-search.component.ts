import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../service/common-service.service';
import { CustomerService } from '../../../service/customer.service';

@Component({
  selector: 'app-create-search',
  templateUrl: './create-search.component.html',
  styleUrls: ['./create-search.component.css']
})
export class CreateSearchComponent implements OnInit {
  customerTypeForm: any;
  customerTypeList: any;
  customer_id: any;
  localFields = {};
  display= 'none';
  customerSearchList = [];
  selectedCustomerTypeList = [];
  selectedCustomerContactList = [];
  selectedContactList = [];
  
  constructor(private _commonSVC: CommonServiceService, private _customerSVC: CustomerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.customer_id = this.route.snapshot.params.id;
    this.customerTypeForm = new FormGroup({
      customer_type: new FormControl('', Validators.required)
    });

    this._commonSVC.getCustomerTypeList().subscribe((data) => {
      //this.customerList = data.json();
      this.customerTypeList = data.customer_type;
      console.log(this.customerTypeList);
    });

    this._customerSVC.getSelectedCustomerTypeList(this.customer_id).subscribe((data) => {
      this.selectedCustomerTypeList = data.customer_type;
    });
 
    /*
    this._customerSVC.getselectedContactList().subscribe((data) => {
      this.selectedContactList = data.contact;
    });
    */

    this._customerSVC.getSelectedCustomerContactList(this.customer_id).subscribe((data) => {
      this.selectedCustomerContactList = data.contact;
    });

    this.localFields = { text: 'type', value: 'id' };
  }
  
  deleteItem(i, type_id) {
    console.log('******delete', i, type_id)
    this._customerSVC.removeCustomerType(this.customer_id, type_id).subscribe((data) => {
      this.selectedCustomerTypeList.splice(i, 1);
    });
  }

  saveCustomerType(value) {
    console.log('******delete', value)
  }

  closeCustomerTypeModalDialog() {
    this.display = 'none'; // set none css after close dialog
  }
}
