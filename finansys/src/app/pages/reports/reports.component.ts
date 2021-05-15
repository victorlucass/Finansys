import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  month : Array<any> = [
    { number: '', name:'Selecione um mês'  },
    { number: '1', name:'Janeiro'  },
    { number: '2', name:'Fevereiro'  },
    { number: '3', name:'Março'  },
    { number: '4', name:'Abril'  },
    { number: '5', name:'Maio'  },
    { number: '6', name:'Junho'  },
    { number: '7', name:'Julho'  },
    { number: '8', name:'Agosto'  },
    { number: '9', name:'Setembro'  },
    { number: '10', name:'Outubro'  },
    { number: '11', name:'Novembro'  },
    { number: '12', name:'Dezembro'  },
  ]

  year: Array<any> = [
    { year: 'Selecione um ano' },
    { year: '2016' },
    { year: '2017' },
    { year: '2018' },
    { year: '2019' },
    { year: '2020' },
    { year: '2021' },
    { year: '2022' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
