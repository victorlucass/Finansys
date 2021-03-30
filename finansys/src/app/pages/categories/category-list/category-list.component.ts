import { CategoryService } from './../../../services/category.service';
import { element } from 'protractor';
import { Category } from './../../../shared/model/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories : Category[];

  constructor(private service: CategoryService) { 
  }
  
  ngOnInit(): void {
    this.service.getAll().subscribe(response => { this.categories = response }, error =>{ console.log('Deu merda')});
  }

  alert(s:string) {
    alert(s);
  }

  delete(category : Category):void{
    const confirmation = confirm("Deseja excluir?");
    if(confirmation){
      this.service.delete(category.id).subscribe(
        () => { 
          this.categories = this.categories.filter(element => element != category), console.log(category)
        },
        (error) => { alert(error) }
      );
    }
  }

}
