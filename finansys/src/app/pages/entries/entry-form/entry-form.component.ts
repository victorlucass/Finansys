import { CategoryService } from '../../../shared/services/category.service';
import { EntryService } from '../../../shared/services/entry.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import toastr from 'toastr';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@Angular/router';
import { Entry } from 'src/app/shared/model/entry';
import { Category } from 'src/app/shared/model/category';
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
  categories: Category[] = [];

  imaskConfig = {
    mask : Number, //tipo
    scale: 2, //Escalas, quantidade de decimais após a vírgulas. 
    thousandsSeparator: '', //Separador de milhas
    padFractionalZeros: true, //Adiciona zeros acaso a pessoa não complete tudo. 
    normalizeZero: true, //?
    radix: "," //Separador de decimais
  }; 

  date: Date = new Date();
  dataAtual: string = `${this.date.getDate()}/${this.date.getMonth() + 1}/${this.date.getFullYear()}`

  pt = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho','Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(
    private service: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formsBuilder: FormBuilder,
    private categoryService : CategoryService
  ) {}

  ngOnInit(): void {
    this.setCurrentAction();
    this.entryFormBuilder();
    this.loadEntry();
    this.loadCategories();
  }

  private setCurrentAction() {
    this.currentAction =
      this.route.snapshot.url[0].path == 'new' ? 'new' : 'edit';
  }

  private setPageTitle() {
    if(this.currentAction == 'new'){
      this.pageTitle = 'Cadastrando novo lançamento'
    }else{
      const entryName = this.entry.name || '';
      this.pageTitle = 'Atualizando lançamento: ' + entryName;
    }
  }
  private entryFormBuilder() {
    this.entryForm = this.formsBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: [Entry.types.expense, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [this.dataAtual, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]],
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

  loadCategories(): Category[] {
    this.categoryService.getAll().subscribe(
      categories => { 
        this.categories = categories;
      }
    );

    return this.categories;
  }

  submitForm() {
    this.currentAction == 'new' ? this.createEntry() : this.updateEntry();
  }

   get typeOptions(): Array<any>{
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          value: value,
          text: text
        }
      }
    )
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
      toastr.success("Lançamento cadastrada com sucesso.");
      this.router.navigate(['entries']);
     }else{
      toastr.success("Lançamento atualizada com sucesso.");
      this.router.navigate(['entries']);
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

  //Métodos vindo do (click)
  setPaid(value?: boolean):void{
    this.entryForm.get('paid').setValue(value);
  }
  
  //Esse método será efetuada após tudo tiver pronto, ou seja, é o último método ser executada.
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }
}
