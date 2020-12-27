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

  getAll():Observable<Category[]>  {
    return this.http.get(this.apiPath).pipe(
      catchError()
    )
  }

}
