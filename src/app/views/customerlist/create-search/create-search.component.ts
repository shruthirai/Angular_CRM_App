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
  customer_type_id: any;
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
      this.customerTypeList = data.customer_type;
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
  
  /*
  deleteItem(i, type_id, item) {
    this._customerSVC.removeCustomerType(this.customer_id, type_id).subscribe((data) => {
      this.selectedCustomerTypeList.splice(i, 1);
    });
  }
  */

  deleteItem(i, type_id, item) {
    if ((this.selectedCustomerTypeList.length) > 1) {
      this._customerSVC.removeCustomerType(this.customer_id, type_id).subscribe((data) => {
        this.selectedCustomerTypeList.splice(i, 1);
      });
    } else {
      alert("Cannot delete Customer Type since Customer should have atleast 1 Customer Type!");
    }
  }

  saveCustomerType(value) {
    this._customerSVC.addCustomerType(this.customer_id, this.customer_type_id).subscribe((data) => {
      //console.log(data.json())
      let item = data.json();
      this.selectedCustomerTypeList.push(item.customer_type[0]);
    });
  }

  typeChange(value) {
    this.customer_type_id = value.target.value;
  }

  closeCustomerTypeModalDialog() {
    this.display = 'none'; // set none css after close dialog
  }

  addTypeClick() {
    /*console.log(this.customerTypeList)
    console.log(this.selectedCustomerTypeList)
    var that = this;
    this.selectedCustomerTypeList.forEach(function(item) {
      let index = that.customerTypeList.findIndex(function(d) {
        return item.id == d.id;
      });
      console.log(index);
      that.customerTypeList.splice(index, 1);
    })*/
  }
}
