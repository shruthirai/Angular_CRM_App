import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../service/common-service.service';

@Component({
  selector: 'app-create-customer-type',
  templateUrl: './create-customer-type.component.html',
  styleUrls: ['./create-customer-type.component.css']
})

export class CreateCustomerTypeComponent implements OnInit {
  customerTypeForm: any;
  @Input() display;
  @Output() displayChange = new EventEmitter();
  @Output() addedCustomerType= new EventEmitter();
  constructor(private _commonSVC: CommonServiceService) { }

  ngOnInit() {
    // Login Validation
    this.customerTypeForm = new FormGroup({
      customer_type: new FormControl('', Validators.required)
    });
  }

  closeCustomerTypeModalDialog() {
    //this.customerTypeForm.reset();
    this.display = 'none'; // set none css after close dialog
    this.displayChange.emit(this.display);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

  saveCustomerType() {
    if (this.customerTypeForm.valid) {
      this.addedCustomerType.emit(this.customerTypeForm.value);
      this.closeCustomerTypeModalDialog();
      //this.customerTypeForm.reset();
    } else {
      this._commonSVC.validateAllFields(this.customerTypeForm);
    }
  }
}
