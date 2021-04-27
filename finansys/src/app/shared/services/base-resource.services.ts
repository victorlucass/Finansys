import { BaseResource } from "../models/base-resource";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Injector } from "@angular/core";
import { Category } from "src/app/pages/model/category";


export abstract class BaseResourceService<T extends BaseResource> {
    
    constructor(protected endPoint: string, protected injector: Injector){
        this.http = injector.get(HttpClient);
        this.apiPath = environment.API + endPoint;
    }
    protected apiPath:string;
    protected http: HttpClient;


    getAll(): Observable<Category[]> {
        return this.http.get<T[]>(this.apiPath);
    }

    getById(id: number): Observable<any> {
        return this.http.get<T>(`${this.apiPath}/${id}`);
    }

    create(resource: T): Observable<any> {
        return this.http.post<T>(`${this.apiPath}`, resource);
    }

    update(resource: T): Observable<any> {
        return this.http.put(`${this.apiPath}/${resource.id}`, resource);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiPath}/${id}`);
    }
}