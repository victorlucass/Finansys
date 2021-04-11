import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/services/entry.service';
import { Entry } from 'src/app/shared/model/entry';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {
  entries: Entry[] =[];

  
  constructor(
    private service: EntryService
    ) { 
    }
    
    ngOnInit(): void {
      this.service.getAll().subscribe(
        (entries) => { 
           let entriesList: Entry[];
           entriesList = entries;
           entriesList.map(element => {
            const entry = Object.assign(new Entry(), element);
            this.setStatus(entry)
            this.entries.push(entry);
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

  setStatus(entry : Entry){
    if(entry.paid == true){
      entry.status = 'PAGO'
    }else{
      entry.status = 'PENDENTE'
    }
  }

}
