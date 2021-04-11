import { Category } from './category';

export class Entry {
  public id?: number;
  public name?: string;
  public description?: string;
  public type?: string;
  public amount?: string;
  public date?: string;
  public paid: boolean;
  public category?: Category;
  public categoryId?: number;
  public status: string;
  constructor(){
  }

  static types = {
    expense: 'Despesa',
    renevue: 'Receita',
  };
  
}
