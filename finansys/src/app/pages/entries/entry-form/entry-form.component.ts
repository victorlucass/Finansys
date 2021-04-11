import { EntryService } from './../../../services/entry.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import toastr from 'toastr';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@Angular/router';
import { Entry } from 'src/app/shared/model/entry';
@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
})
export class EntryFormComponent implements OnInit {
  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[];
  entry: Entry = new Entry();

  constructor(
    private service: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formsBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setCurrentAction();
    this.entryFormBuilder();
    this.loadEntry();
  }

  private setCurrentAction() {
    this.currentAction =
      this.route.snapshot.url[0].path == 'new' ? 'new' : 'edit';
  }

  private setPageTitle() {
    if(this.currentAction == 'new'){
      this.pageTitle = 'Cadastrando nova Categoria: '
    }else{
      const entryName = this.entry.name || '';
      this.pageTitle = 'Atualizando Lançamento: ' + entryName;
    }
  }
  private entryFormBuilder() {
    this.entryForm = this.formsBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [null, [Validators.required]],
      entryId: [null, [Validators.required]],
    });
  }

  private loadEntry() {
    if (this.currentAction == 'edit') {
      this.route.params
        .pipe(switchMap((paramsId) => this.service.getById(+paramsId.id)))
        .subscribe(
          (entry) => {
            this.entry = entry;
            this.entryForm.patchValue(entry);
          },
          (erro) => {
            alert('Deu merda');
          }
        );
    }
  }

  submitForm() {
    this.currentAction == 'new' ? this.createEntry() : this.updateEntry();
  }

  createEntry() {
    const entryNew: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.service.create(entryNew).subscribe(
      () => {
        this.actionsForSuccess(entryNew);
      },
      (erro) => {
        this.actionsForError(erro);
      }
    );
  }

  updateEntry() {
    const entryNew: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.service.update(entryNew).subscribe(
      () => {
        this.actionsForSuccess(entryNew);
      },
      (erro) => {
        this.actionsForError(erro);
      }
    );
  }

  actionsForSuccess(entriesNew: Entry) {
    if(this.currentAction == 'new'){
      toastr.success("Categoria cadastrada com sucesso.");
      this.ngOnInit(); 
    }else{
      toastr.success("Categoria atualizada com sucesso.");
      this.router.navigate(['categories'])
    }
  }
  
  actionsForError(error: any) {
    toastr.error("Ops! Algo deu errado!"); 
    if(error.status == 422){
      this.serverErrorMessages = JSON.parse(error._body).errors;
    }else{
      this.serverErrorMessages = ['Erro no servidor, por favor tente mais tarde.']
    }
  }
  
  ngAfterContentChecked(): void {//Esse método será efetuada após tudo tiver pronto, ou seja, é o último método ser executada.
    this.setPageTitle();
  }
}
