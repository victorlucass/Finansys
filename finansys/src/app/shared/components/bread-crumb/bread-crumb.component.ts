import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {

  @Input() items : Array<BreadCrumbItem> = [];

  constructor() { }

  ngOnInit(): void {
  }

  isTheLastItem(item: BreadCrumbItem): boolean {
    const index = this.items.indexOf(item);
    return index + 1 == this.items.length;
    // O uso de '+ 1' é pq a posição começa com zero, e o length(tamanho da lista) começa apartir do 1. Isso é para igualar os valores.
  }

}

interface BreadCrumbItem {
  text: string;
  url?: string;
}
