import { OnInit } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from 'src/app/shared/model/category';

export class InMemoryDatabase implements InMemoryDbService {
  createDb(){
    const categories: Category[] = [
      {id:1, name:'Moradia', description: 'Pagamentos de Contas da Casa'},
      {id:2, name:'Saúde', description: 'Plano de Saúde e Remédios'},
      {id:3, name:'Salário', description: 'Cinema, parques, praia, etc'},
      {id:4, name:'Salário', description: 'Recebimento de Salário'},
      {id:5, name:'Freelas', description: 'Trabalhos como freelancer'}
    ];

    return {categories};

  }

}