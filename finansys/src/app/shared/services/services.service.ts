import { Category } from './../model/category';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Category } from '../model/category';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiPath: string = 'api/categories'; //Padrão para fazer requisições no In-Memory

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

}
