import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EntryService } from 'src/app/pages/services/entry.service';
import { Entry } from 'src/app/pages/model/entry';
import { CategoryService } from './../services/category.service';
import { Category } from 'src/app/pages/model/category';
import currencyFormatter from "currency-formatter"
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;
  expenseChartData: any;
  revenueChartData: any;
  categories: Category[] = [];
  entries: Entry[] = [];
  @ViewChild('month') month : ElementRef = null; //Ele se refere ao #month lá no html;
  @ViewChild('year') year : ElementRef = null;

  constructor(private categoryService: CategoryService, private entryService: EntryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      (categories) => {
        this.categories = categories
      }
    )
  }

  generateReports(){
    const month = this.month.nativeElement.value; //Pega o valor do #month;
    const year = this.year.nativeElement.value;
    
    if(!month || !year){
      alert("Você precisa selecionar o Mês e o Ano para gerar os relatórios!")
    } else{
      this.entryService.getByMonthAndYear(month, year);
    }

  }

}
