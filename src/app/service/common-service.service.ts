import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Response, Headers } from '@angular/http';  
import 'rxjs/Rx'; 

@Injectable()
export class CommonServiceService {

  constructor(private http: Http) { }

  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFields(control);            
      }
    });
  }

  getCustomerTypeList() {
    let self = this;  
    return this.http.get('http://localhost:8000/customer_type')  
      .map((res: Response) => {
        console.log(res.json());
      return res.json();
    });
  }
}
