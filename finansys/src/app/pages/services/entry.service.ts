import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Entry } from '../model/entry';
import { Observable } from 'rxjs';
import { CategoryService } from './category.service';
import { flatMap } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/services/base-resource.services';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{
  constructor(protected injector: Injector, private categoryService: CategoryService) { 
    super("/entries", injector);
  }

  create(entry: Entry): Observable<any>{
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return this.http.post<Entry>(this.apiPath, entry);
      })
    )
  }

  update(entry: Entry): Observable<any>{
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => { 
        entry.category = category;
        return super.update(entry)
       })
    )
  }
}
