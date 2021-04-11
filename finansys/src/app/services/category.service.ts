import { environment } from './../../environments/environment';
import { Category } from './../shared/model/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = `${environment.API}/categories`; //Padrão para fazer requisições no In-Memory

  constructor(private http: HttpClient) { }

  getAll():Observable<any>{
    return  this.http.get<Category[]>( this.apiPath);
  }

  getById(id: number): Observable<any>{
    return this.http.get<Category>(`${this.apiPath}/${id}`);
  }

  create(cat : Category): Observable<any>{
    return this.http.post<Category>(`${this.apiPath}`, cat);
  }

  update(cat : Category): Observable<any>{
    return this.http.put(`${this.apiPath}/${cat.id}`, cat);
  }

  delete(id: number) : Observable<any> {
    return this.http.delete<any>(`${this.apiPath}/${id}`);
  }
}
