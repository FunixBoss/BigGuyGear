import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { RouterModule } from '@angular/router';
import { NbAccordionModule, NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomCustomerActionComponent } from './customer-list/custom/custom-customer-action/custom-customer-action.component';
import { CustomCustomerImageComponent } from './customer-list/custom/custom-customer-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCustomerFilterActionsComponent } from './customer-list/custom/custom-customer-filter-actions/custom-customer-filter-actions.component';
import { CustomCustomerActiveActionComponent } from './customer-list/custom/custom-customer-active-action.component';
import { CustomerListMultiComponent } from './customer-list/customer-list-multi/customer-list-multi.component';



@NgModule({
  declarations: [
    CustomersComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    CustomCustomerActionComponent,
    CustomCustomerImageComponent,
    CustomCustomerFilterActionsComponent,
    CustomCustomerActiveActionComponent,
    CustomerListMultiComponent
  ],
  imports: [
    CustomersRoutingModule,
    RouterModule,
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbButtonModule,
    NbActionsModule,    
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbAccordionModule,
    NbIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomersModule { }
