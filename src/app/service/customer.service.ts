import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';  
import { Http, Response} from '@angular/http';  
import 'rxjs/Rx'; 


@Injectable()
export class CustomerService {

  constructor(private http: Http) {  }

  getCustomerList() {
  	let self = this;  
    return this.http.get('http://localhost:8000/customers')  
        .map((res: Response) => {
            console.log(res.json());
            return res.json();
    	});  
    //return this.http.get('../../assets/customerlist.json');
  }
}
