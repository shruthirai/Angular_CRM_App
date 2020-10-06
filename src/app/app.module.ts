import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { routingModule } from './app.routing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomerlistComponent } from './views/customerlist/customerlist.component';
import { PermissionsComponent } from './views/permissions/permissions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateCustomerComponent } from './views/customerlist/create-customer/create-customer.component';
import { CommonServiceService } from './service/common-service.service';
import { HttpModule, Http } from '@angular/http';
import { CustomerService } from './service/customer.service';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerlistComponent,
    PermissionsComponent,
    CreateCustomerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, routingModule, ReactiveFormsModule, FormsModule,MultiSelectAllModule,
    HttpModule
  ],
  providers: [CommonServiceService, CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
