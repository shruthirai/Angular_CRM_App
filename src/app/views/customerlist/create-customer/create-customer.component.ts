import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../service/common-service.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  customerTypeList = [];
  localFields = {};
  localWaterMark = 'Select Customer Type';
  customerForm: any;
  @Input() display;
  @Output() displayChange = new EventEmitter();
  @Output() addedCustomer= new EventEmitter();
  constructor(private _commonSVC: CommonServiceService) { }

  ngOnInit() {

    // Login Validation
    this.customerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      company_name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      postal_address: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      cutomerType: new FormControl('', Validators.required)
    });

    this.customerTypeList = [];
    this._commonSVC.getCustomerTypeList().subscribe((data) => {
      this.customerTypeList = data.customer_type;
    });

    this.localFields = { text: 'type', value: 'id' };
  }

  closeModalDialog() {
    //this.customerForm.reset();
    this.display = 'none'; // set none css after close dialog
    this.displayChange.emit(this.display);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

  saveCustomer(form) {
    if (this.customerForm.valid) {
      this.addedCustomer.emit(this.customerForm.value);
      this.closeModalDialog();
    } else {
      this._commonSVC.validateAllFields(this.customerForm);
    }
  }
}