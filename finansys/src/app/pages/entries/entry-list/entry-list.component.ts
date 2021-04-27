import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/shared/services/entry.service';
import { Entry } from 'src/app/shared/model/entry';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {
  entries: Entry[] =[];

  
  constructor(private service: EntryService) {}
    
    ngOnInit(): void {
      this.service.getAll().subscribe(
        (entries) => { 
           let entriesList: Entry[];
           entriesList = entries.sort((a,b) => b.id - a.id);
           entriesList.map(entry => {
            const x = Object.assign(new Entry(), entry);
            EntryListComponent.setStatus(x);
            this.entries.push(x);
           });
        }, erro => {
          alert('Deu merda');
        }
      )
    }

    delete(entry : Entry):void{
      const confirmation = confirm("Você deseja excluir ?");
      if( confirmation ){
        this.service.delete(entry.id).subscribe(
          () => { this.entries = this.entries.filter(element => element != entry) },
          erro => { alert(erro) }
        )
      }
    }

  static setStatus(entry : Entry){
    if(entry.paid == true){
      entry.status = 'PAGO'
    }else{
      entry.status = 'PENDENTE'
    }
  }

}
