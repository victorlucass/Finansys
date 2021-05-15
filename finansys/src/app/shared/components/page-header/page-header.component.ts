import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input("page-title") pageTitle: string;
  @Input() router : string;
  @Input("title-button") titleButton  : string;
  @Input("class-button") classButton : string;

  constructor() { }

  ngOnInit(): void {
  }

}
