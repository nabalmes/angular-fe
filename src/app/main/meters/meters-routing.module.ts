import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetersComponent } from './meters.component';
import { MeterFormComponent } from './meter-form/meter-form.component';

const routes: Routes = [
  {
    path: '',
    component: MetersComponent
  },
  {
    path: 'add',
    component: MeterFormComponent,
    data: {
      title: 'Add New Meter',
      breadcrumb: "New"
    }
  },
  {
    path: 'edit/:id',
    component: MeterFormComponent,
    data: {
      title: 'Edit Meter',
      breadcrumb: "Edit"
    }
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetersRoutingModule { }
