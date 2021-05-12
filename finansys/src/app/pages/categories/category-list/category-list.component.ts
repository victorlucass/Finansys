import { CategoryService } from '../../services/category.service';
import { element } from 'protractor';
import { Category } from '../../model/category';
import { Component, OnInit } from '@angular/core';
import { BaseResourceList } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceList<Category> implements OnInit {

  constructor(protected service: CategoryService) { 
    super(service, Category.fromJson);
  }
  
  ngOnInit(): void {
    super.ngOnInit()
  }
}
