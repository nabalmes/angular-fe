import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { AccountFormComponent } from './account-form/account-form.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent
  },
  {
    path: 'add',
    component: AccountFormComponent,
    data: {
      title: 'Add New Account',
      breadcrumb: "New"
    }
  },
  {
    path: 'edit/:id',
    component: AccountFormComponent,
    data: {
      title: 'Edit Account',
      breadcrumb: "Edit"
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
