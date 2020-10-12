import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
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
  localFields = {};
  display= 'none';
  customerSearchList = [];
  
  constructor(private _commonSVC: CommonServiceService, private _customerSVC: CustomerService) { }

  ngOnInit() {
    this.customerTypeForm = new FormGroup({
      customer_type: new FormControl('', Validators.required)
    });

    this._commonSVC.getCustomerTypeList().subscribe((data) => {
      //this.customerList = data.json();
      this.customerTypeList = data.customer_type;
      console.log(this.customerTypeList);
    });

    this._customerSVC.getCustomerSearchList().subscribe((data) => {
      console.log('********', data.json())
      this.customerSearchList = data.json();

    });

    this.localFields = { text: 'type', value: 'id' };
  }

  closeCustomerTypeModalDialog() {
    this.display = 'none'; // set none css after close dialog
  }
}
