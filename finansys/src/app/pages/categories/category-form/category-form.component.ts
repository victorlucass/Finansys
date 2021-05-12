import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category>{

  constructor(
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(injector, new Category(), categoryService, Category.fromJson);
  }

  protected resourceFormBuild(): void {
    this.resourceForm = this.formBuilder.group({
      id : [null],
      name: [null, [Validators.required, Validators.minLength(2)] ],
      description: [null]
    })
  }

  createTitlePage(): string {
    return "Cadastro de Nova Categoria";
  }
  editionTitlePage(): string {
    const categoryName = this.resource.name || "";
    return categoryName;
  }

}
