import { BaseResource } from 'src/app/shared/models/base-resource';
import { Category } from './category';

export class Entry extends BaseResource {
  public id?: number;
  public name?: string;
  public description?: string;
  public type?: string;
  public amount?: string;
  public date?: string;
  public paid?: boolean;
  public category?: Category;
  public categoryId?: number;
  public status?: string;
  constructor() {
    super();
  }

  static types = {
    revenue: 'Receita',
    expense: 'Despesa',
  };

}
