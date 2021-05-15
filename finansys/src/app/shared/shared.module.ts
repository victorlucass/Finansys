import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component'
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';



@NgModule({
  declarations: [BreadCrumbComponent, PageHeaderComponent, FormFieldErrorComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent
  ]
})
export class SharedModule { }
