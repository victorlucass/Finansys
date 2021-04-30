import { Injectable, Injector } from '@angular/core';
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

  create(entry: Entry): Observable<Entry>{
    return this.setCategoryAndSendToServer(entry, super.create.bind(this));
    // O bind serve para definir o escopo do 'this', pq no flatMap  ele leva em consideração o escopo de si, e não da classe EntryService, o bind por sua vez serve para apontar para a classe EntryService.
  }

  update(entry: Entry): Observable<Entry>{
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any):Observable<Entry>{
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return sendFn(entry);
      })
    );
  }

}
