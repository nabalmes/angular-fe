import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetersRoutingModule } from './meters-routing.module';
import { MetersComponent } from './meters.component';
import { MeterFormComponent } from './meter-form/meter-form.component';
import { CoreCommonModule } from '@core/common.module';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';


@NgModule({
  declarations: [
    MetersComponent,
    MeterFormComponent
  ],
  imports: [
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    NgbModule,
    CoreTouchspinModule,
    MetersRoutingModule
  ]
})
export class MetersModule { }
