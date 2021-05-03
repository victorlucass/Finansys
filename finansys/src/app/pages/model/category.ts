import { BaseResourceModel } from "src/app/shared/models/base-resource-model";

export class Category extends BaseResourceModel {

    public id?: number;
    public name?: string;
    public description?: string;

    constructor() {
        super();
    }

    static fromJson(jsonData: any): Category{
        return Object.assign(new Category(), jsonData);
    }
}
