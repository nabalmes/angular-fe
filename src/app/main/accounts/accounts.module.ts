import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';


@NgModule({
  declarations: [
    AccountsComponent,
    AccountFormComponent
  ],
  imports: [
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    NgbModule,
    CoreTouchspinModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }
