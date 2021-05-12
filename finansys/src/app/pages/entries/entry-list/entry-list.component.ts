import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/pages/services/entry.service';
import { Entry } from 'src/app/pages/model/entry';
import { BaseResourceList } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseResourceList<Entry> implements OnInit {

  constructor(protected service: EntryService) { 
    super(service, Entry.fromJson);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  static setStatus(entry: Entry) {
    if (entry.paid == true) {
      entry.status = 'PAGO'
    } else {
      entry.status = 'PENDENTE'
    }
  }

}
