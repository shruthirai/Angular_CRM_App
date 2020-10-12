import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';  
import { Http, Response, Headers } from '@angular/http';  
import 'rxjs/Rx'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonServiceService } from '../service/common-service.service';

@Injectable()
export class CustomerService implements OnInit {
  customerForm: any;
  constructor(private http: Http, private _commonSVC: CommonServiceService) {  }

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
  }

  /* Get from backend to UI */
  getCustomerList() {
  	let self = this;
    return this.http.get('http://localhost:8000/customers')  
      .map((res: Response) => {
        let data = res.json();
        let customerList = [];
        data.customer.forEach(function(d) {
          let item = {
            "address": d.address,
            "email": d.email,
            "id": d.id,
            "name": d.name,
            "postal_address": d.postal_address,
            "serial_number": d.serial_number,
            "company_name": d.company_name,
            "telephone": d.telephone,
            "customer_type": d.customer_type.split()
          };
          customerList.push(item);
        });
        return customerList;
    });
  }

  /* Post from UI create form to backend - Customer */
  saveCustomer(data) {
    let formData = {
      "name": data.name,
      "customer_type": data.cutomerType,
      "address":  data.address,
      "postal_address": data.postal_address,
      "telephone": data.telephone,
      "email": data.email,
      "company_name": data.company_name
    };

    let headers = new Headers();  
    headers.append('Content-Type', 'application/json; charset=utf-8');  
    return this.http.post("http://localhost:8000/create/customer", formData, { headers: headers })  
      .subscribe((res: Response) => {  
    }); 
  }

  /* Post from UI create form to backend - Customer type */
  saveCustomerType(data) {
    let formData = {
      "type": data.customer_type
    };

    let headers = new Headers();  
    headers.append('Content-Type', 'application/json; charset=utf-8');  
    return this.http.post("http://localhost:8000/create/customer_type", formData, { headers: headers })  
      .subscribe((res: Response) => {  
    }); 
  }

  /* Post from UI create form to backend - Contact */
  saveContact(data) {
    let formData = {
      first_name: data.first_name,
      last_name: data.last_name,
      title: data.title,
      phone: data.mobile_phone,
      email: data.email,
      customer_id: data.customer_id === 'Select' ? null : parseInt(data.customer_id)
    };

    let headers = new Headers();  
    headers.append('Content-Type', 'application/json; charset=utf-8');  
    return this.http.post("http://localhost:8000/create/contact", formData, { headers: headers })  
      .subscribe((res: Response) => {  
    }); 
  }

  /* Get for create search table */
  getSelectedCustomerTypeList(customer_id) {
    let self = this;
    return this.http.get('http://localhost:8000/customer/customer_type/' + customer_id)  
      .map((res: Response) => {
        let data = res.json();
        return data;
    });
  }

  /* Get for contact search table */
  getselectedContactList(customer_id) {
    let self = this;
    /*
    return this.http.get('http://localhost:8000/customer/customer_type/' + customer_id)  
      .map((res: Response) => {
        let data = res.json();
        return data;
    });
    */
  } 
}
