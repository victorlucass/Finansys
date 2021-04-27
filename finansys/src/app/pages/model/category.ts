import { BaseResource } from "src/app/shared/models/base-resource";

export class Category extends BaseResource {

    public id?: number;
    public name?: string;
    public description?: string;

    constructor() {
        super();
    }

}
