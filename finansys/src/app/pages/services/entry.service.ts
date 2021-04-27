import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Entry } from '../model/entry';
import { Observable } from 'rxjs';
import { CategoryService } from './category.service';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = `${environment.API}/entries`

  constructor(private http: HttpClient, private categoryService : CategoryService) { }

  getAll(): Observable<Entry[]>{
    return this.http.get<Entry[]>(this.apiPath);
  }
  getById(id: number): Observable<any>{
    return this.http.get<Entry>(`${this.apiPath}/${id}`);
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
        return this.http.put(`${this.apiPath}/${entry.id}`, entry);
       })
    )
  }
  delete(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiPath}/${id}`)
  }

}
