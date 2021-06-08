import { Injectable, Injector } from '@angular/core';
import { Entry } from '../model/entry';
import { Observable } from 'rxjs';
import { CategoryService } from './category.service';
import { flatMap, map } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/services/base-resource.services';
import * as moment from "moment";
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

  getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    )
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
    return entries.filter(entry => {
      const entryDate = moment(entry.date, "DD/MM/YYYY");
      const monthMatches = entryDate.month() + 1 == month;
      const yearMatches = entryDate.year() == year;

      if(monthMatches && yearMatches) return entry;
    })
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
