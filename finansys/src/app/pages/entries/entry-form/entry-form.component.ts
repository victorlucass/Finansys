import { CategoryService } from '../../services/category.service';
import { EntryService } from '../../services/entry.service';
import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Entry } from 'src/app/pages/model/entry';
import { Category } from 'src/app/pages/model/category';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {
  
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
    protected injector: Injector,
    protected entryService: EntryService,
    protected categoryService: CategoryService
    ) {
      super(injector, new Entry(), entryService, Entry.fromJson);
    }
    
    ngOnInit() {
      super.ngOnInit(); //Estava tendo erro devido esse ngOnInit, ou seja, deve chamar esse cara.
      this.loadCategories();
    }
    
    get typeOptions(): Array<any>{
      return Object.entries(Entry.types).map(
        ([value, text]) => {
          return {
            text : text,
            value : value
          }
        }
        )
      }
      
      protected resourceFormBuild(): void {
          this.resourceForm = this.formBuilder.group({
          id: [null],
          name: [null, [Validators.required, Validators.minLength(2)]],
          description: [null],
          type: [Entry.types.expense],
          amount: [null, [Validators.required]],
          date: [this.dataAtual],
          paid: [true],
          categoryId: [null, [Validators.required]],
        });
      }
      
      protected createTitlePage(): string {
        return "Novo Lançamento";
      }

      protected editionTitlePage(): string {
        const entryName = this.resource.name || '';
        return entryName;
      }

      
  loadCategories() {
    return this.categoryService.getAll().subscribe(
      (categories) => this.categories = categories
    );
  }

  setPaid(value?: boolean):void{
    this.resourceForm.get('paid').setValue(value);
  }
  
}
