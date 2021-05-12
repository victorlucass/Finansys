import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component'
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [BreadCrumbComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BreadCrumbComponent
  ]
})
export class SharedModule { }
