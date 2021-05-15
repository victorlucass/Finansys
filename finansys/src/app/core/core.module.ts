import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule  } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../../in-memory-database';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';




@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    RouterModule
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NavbarComponent
  ]
})
export class CoreModule { }
