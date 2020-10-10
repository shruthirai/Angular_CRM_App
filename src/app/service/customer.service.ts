import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';  
import { Http, Response, Headers } from '@angular/http';  
import 'rxjs/Rx'; 


@Injectable()
export class CustomerService {

  constructor(private http: Http) {  }

  /* Get from database to UI */
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
            "telephone": d.telephone,
            "customer_type": d.customer_type.split()
          };
          customerList.push(item);
        });
        return customerList;
    });
  }

  /* Post from UI create form to database - Customer */
  saveCustomer(data) {
    let formData = {
      "name": data.name,
      "customer_type": data.cutomerType,
      "address":  data.address,
      "postal_address": data.postal_address,
      "telephone": data.telephone,
      "email": data.email
    };

    let headers = new Headers();  
    headers.append('Content-Type', 'application/json; charset=utf-8');  
    return this.http.post("http://localhost:8000/create/customer", formData, { headers: headers })  
      .subscribe((res: Response) => {  
      }); 
  }

  /* Post from UI create form to database - Customer type */
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

  /* Post from UI create form to database - Contact */
  saveContact(data) {
    let formData = {
      first_name: data.first_name,
      last_name: data.last_name,
      title: data.title,
      phone: data.mobile_phone,
      email: data.email,
      customer_id: data.customer_id === 'Select' ? null : parseInt(data.customer_id)
    };
console.log(formData)
    let headers = new Headers();  
    headers.append('Content-Type', 'application/json; charset=utf-8');  
    return this.http.post("http://localhost:8000/create/contact", formData, { headers: headers })  
      .subscribe((res: Response) => {  
      }); 
  }
}
