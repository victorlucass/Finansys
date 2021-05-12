import { Injectable, OnInit } from "@angular/core";
import { BaseResourceModel } from "../../models/base-resource-model";
import { BaseResourceService } from "../../services/base-resource.services";

@Injectable()
export abstract class BaseResourceList<T extends BaseResourceModel> implements OnInit {

    listResource: T[] = [];

    constructor(
        protected service: BaseResourceService<T>,
        protected jsonDataToResourceFn: (jsonData) => T
    ) {

    }

    ngOnInit(): void {
        this.service.getAll().subscribe(
            (resource) => {
                let resourceList = resource.sort((a, b) => b.id - a.id);
                resourceList.map(
                    (resource) => { 
                        const r = this.jsonDataToResourceFn(resource);
                        this.listResource.push(r);
                     },
                    (erro) => {  
                         alert("Deu merda!")
                    }
                );
            },
            (erro) => {  alert("Deu merda!") }
        );
    }

    protected delete(resource: T): void {
        const confirmation = confirm("Você realmente quer deletar este item ?");
        if(confirmation){
            this.service.delete(resource.id).subscribe(
                () => {
                    this.listResource = this.listResource.filter(element => 
                        element != resource);
                },
                erro => {
                    alert("Deu merda!")
                }
            )
        }
    }

}