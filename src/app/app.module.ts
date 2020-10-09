import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { routingModule } from './app.routing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomerlistComponent } from './views/customerlist/customerlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateCustomerComponent } from './views/customerlist/create-customer/create-customer.component';
import { CreateContactComponent } from './views/customerlist/create-contact/create-contact.component';
import { CreateSearchComponent } from './views/customerlist/create-search/create-search.component';
import { CreateCustomerTypeComponent } from './views/customerlist/create-customer-type/create-customer-type.component';
import { CommonServiceService } from './service/common-service.service';
import { HttpModule, Http } from '@angular/http';
import { CustomerService } from './service/customer.service';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { HomeComponent } from './views/home/home.component';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CustomerlistComponent,
    HomeComponent,
    CreateCustomerComponent,
    CreateContactComponent,
    CreateSearchComponent,
    CreateCustomerTypeComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, routingModule, ReactiveFormsModule, FormsModule,MultiSelectAllModule,
    HttpModule
  ],
  exports: [RouterModule],
  providers: [CommonServiceService, CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
