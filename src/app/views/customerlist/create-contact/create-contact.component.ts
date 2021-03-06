import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../service/common-service.service';
import { CustomerService } from '../../../service/customer.service';
import { CustomerlistComponent } from '../customerlist.component';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})

export class CreateContactComponent implements OnInit {
  contactForm: any;
  customerList = [];
  customer_id = null;
  @Input() display;
  @Output() displayChange = new EventEmitter();
  @Output() addedContact= new EventEmitter();
  constructor(private _commonSVC: CommonServiceService, private _customerSVC: CustomerService) { }

  ngOnInit() {
  
    // Login Validation
    this.contactForm = new FormGroup({
      last_name: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      mobile_phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });

    this._customerSVC.getCustomerList().subscribe((data) => {
      this.customerList = data;
      console.log(this.customerList);
    });
  }

  closeContactModalDialog() {
    //this.contactForm.reset();
    this.display = 'none'; // set none css after close dialog
    this.displayChange.emit(this.display);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

  saveContact() {
    if (this.contactForm.valid) {
      let data = this.contactForm.value;
      data.customer_id = this.customer_id;
      this.addedContact.emit(data);
      this.closeContactModalDialog();
    } else {
      this._commonSVC.validateAllFields(this.contactForm);
    }
  }

  customerChange(e){
    this.customer_id = e.target.value;
  }
}
