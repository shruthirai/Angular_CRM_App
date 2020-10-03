import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../service/common-service.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  customerForm: any;
  @Input() display;
  @Output() displayChange = new EventEmitter();
  @Output() addedCustomer= new EventEmitter();
  date;
  constructor(private _commonSVC: CommonServiceService) { }

  ngOnInit() {
    this.date = new Date(); // Today date and time
    // Login Validation
    this.customerForm = new FormGroup({
      customerName: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      postalAddress: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }

  closeModalDialog() {
    this.display = 'none'; // set none css after close dialog
    this.displayChange.emit(this.display);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

  saveCustomer() {

    if (this.customerForm.valid) {
      this.addedCustomer.emit(this.customerForm.value);
      this.closeModalDialog();
    } else {
      this._commonSVC.validateAllFields(this.customerForm);
    }
  }
}
