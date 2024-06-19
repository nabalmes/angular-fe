import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { FamilyComponent } from './family/family.component';

const routes: Routes = [
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'meters',
    loadChildren: () => import('./meters/meters.module').then(m => m.MetersModule)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule)
  },
  {
    path: 'members',
    loadChildren: () => import('./members/members.module').then(m => m.MembersModule)
  },
  {
    path: 'family',
    loadChildren: () => import('./family/family.module').then(m => m.FamilyModule)
  },
];

@NgModule({
  declarations: [
  
  ],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
  ],
  providers: []
})
export class MainModule { }
