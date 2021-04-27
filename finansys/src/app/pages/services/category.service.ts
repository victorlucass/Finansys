import { Category } from '../model/category';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.services';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category> {

  constructor(protected injector: Injector) { 
    super("/categories", injector);
  }

  
}
