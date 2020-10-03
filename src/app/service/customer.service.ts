import { Injectable } from '@angular/core';
import {  Http } from '@angular/http';

@Injectable()
export class CustomerService {

  constructor(private http: Http) { }

  getCustomerList(){
    return this.http.get('../../assets/customerlist.json');
  }
}
