import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../service/common-service.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {
  contactForm: any;
  @Input() display;
  @Output() displayChange = new EventEmitter();
  @Output() addedContact= new EventEmitter();
  constructor(private _commonSVC: CommonServiceService) { }

  ngOnInit() {
    // Login Validation
    this.contactForm = new FormGroup({
      last_name: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      mobile_phone: new FormControl('', Validators.required),
      personal_email: new FormControl('', Validators.required),
    });
  }

  closeContactModalDialog() {
    this.display = 'none'; // set none css after close dialog
    this.displayChange.emit(this.display);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

  saveContact() {
    if (this.contactForm.valid) {
      this.addedContact.emit(this.contactForm.value);
      this.closeContactModalDialog();
    } else {
      this._commonSVC.validateAllFields(this.contactForm);
    }
  }
}