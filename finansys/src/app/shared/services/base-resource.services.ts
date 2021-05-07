import { BaseResourceModel } from "../models/base-resource-model";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Injector } from "@angular/core";


export abstract class BaseResourceService<T extends BaseResourceModel> {

    constructor(protected endPoint: string, protected injector: Injector){
        this.http = injector.get(HttpClient);
        this.apiPath = environment.API + endPoint;
    }
    protected apiPath:string;
    protected http: HttpClient;


    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.apiPath);
    }

    getById(id: number): Observable<T> {
        return this.http.get<T>(`${this.apiPath}/${id}`);
    }

    create(resource: T): Observable<T> {
        return this.http.post<T>(`${this.apiPath}`, resource);
    }

    update(resource: T): Observable<T> {
        return this.http.put<T>(`${this.apiPath}/${resource.id}`, resource);
    }

    delete(id: number): Observable<T> {
        return this.http.delete<any>(`${this.apiPath}/${id}`);
    }
}
