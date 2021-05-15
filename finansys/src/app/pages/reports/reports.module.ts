import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';


import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';


@NgModule({
  declarations: [ReportsComponent],
  imports: [
    ReportsRoutingModule,
    SharedModule
  ],
  exports: [
    ReportsComponent
  ]
})
export class ReportsModule { }
