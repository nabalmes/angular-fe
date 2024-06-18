import { NgModule } from '@angular/core';
import {MembersComponent } from './members.component';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { RouterModule, Routes } from '@angular/router';
import { MembersFormComponent } from './members-form/members-form.component';
import { FormsModule } from '@angular/forms';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from 'app/common/shared/shared.module';
import { APIService } from 'app/psgc-api';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MembersResolver } from 'app/common/resolvers/members.resolver';


const routes: Routes = [
  {
    path: '',
    component: MembersComponent
  },
  {
    path: 'add',
    component: MembersFormComponent,
    data: {
      title: 'Add New Member',
      breadcrumb: "New"
    }
  },
  {
    path: 'edit/:id',
    component: MembersFormComponent,
    data: {
      title: 'Edit Member',
      breadcrumb: "Edit"
    },
    resolve: {
      Members: MembersResolver
    }
  },

  {
    path: 'view/:id',
    component: MembersFormComponent,
    data: {
      title: 'View Member',
      breadcrumb: "View"
    },
    resolve: {
      Members: MembersResolver
    }
  },
];

@NgModule({
  declarations: [
   MembersComponent,
   MembersFormComponent,
  ],
  imports: [
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    NgbModule,
    CoreTouchspinModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    Ng2FlatpickrModule,
    SharedModule,
    NgxDatatableModule
  ],
  providers:[
    DatePipe,
    APIService
  ]
})
export class MembersModule { }
