import { NgModule } from '@angular/core';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';


@NgModule({
  declarations: [
    CustomersComponent,
    CustomerFormComponent
  ],
  imports: [
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    NgbModule,
    CoreTouchspinModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
