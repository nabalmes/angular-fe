import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  },
  {
    path: 'add',
    component: CustomerFormComponent,
    data: {
      title: 'Add New Customer',
      breadcrumb: "New"
    }
  },
  {
    path: 'edit/:id',
    component: CustomerFormComponent,
    data: {
      title: 'Edit Customer',
      breadcrumb: "Edit"
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
