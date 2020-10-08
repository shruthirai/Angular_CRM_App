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
            console.log(res.json());
            return res.json();
    	});
  }


  /* Post from UI create form to database - Customer */
  saveCustomer(data) {
    let formData = {
      "name": data.name,
      "serial_number": data.serial_number,
      "customer_type": [1,2],
      "address":  data.address,
      "postal_address": data.postal_address,
      "telephone": data.telephone,
      "email": data.email
    };

    let headers = new Headers();  
    headers.append('Content-Type', 'application/json; charset=utf-8');  
    return this.http.post("http://localhost:8000/create/customer", formData, { headers: headers })  
      .subscribe((res: Response) => {  
        console.log("############",res);
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
        console.log("############",res);
      }); 
  }

  /* Post from UI create form to database - Contact */
  saveContact(data) {
    let formData = {
      first_name: data.first_name,
      last_name: data.last_name,
      title: data.title,
      phone: data.mobile_phone,
      email: data.email
    };

    let headers = new Headers();  
    headers.append('Content-Type', 'application/json; charset=utf-8');  
    return this.http.post("http://localhost:8000/create/contact", formData, { headers: headers })  
      .subscribe((res: Response) => {  
        console.log("############",res);
      }); 
  }
}
