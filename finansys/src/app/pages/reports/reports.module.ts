import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ChartModule } from "primeng/chart";

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    ReportsRoutingModule,
    SharedModule,
    ChartModule
  ],
  exports: [
    ReportsComponent
  ]
})
export class ReportsModule { }
