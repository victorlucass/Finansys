import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from "@Angular/router";
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';
import toastr from 'toastr';
import { switchMap } from "rxjs/operators";
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string; //Vai verificar a ação.
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[];
  category: Category = new Category();


  constructor(
    private categoryService: CategoryService,
    private route : ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  
  ngOnInit(): void {
    this.setCurrentAction(); 
    this.categoryFormBuild();
    this.loadCategory();//Vai carregar a :categoria   
  }
  
  private setCurrentAction() {
    if(this.route.snapshot.url[0].path == 'new'){//snapshot.url[0].path -> vai pegar os valores após a url raiz
      this.currentAction = 'new'
    }else{
      this.currentAction = 'edit'
    }
  }
  
  private setPageTitle() {
    if(this.currentAction == 'new'){
      this.pageTitle = 'Cadastrando nova Categoria: '
    }else{
      const categoryName = this.category.name || '';//Professor usou isso para evitar o delay, pois dá um delay q retorna null, então para na aparecer na tela ele usa ''
      this.pageTitle = 'Atualizando categoria: ' + categoryName;
    }
  }
  
  private categoryFormBuild() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null] 
    })
  }

  private loadCategory() {
    if(this.currentAction == 'edit'){
      this.route.params
      .pipe(
        switchMap(
          params => this.categoryService.getById(+params.id)//Ele vai carregar a categoria pelo id.
          )
        ) 
      .subscribe(
        (cat) => { 
          this.category = cat, 
          this.categoryForm.patchValue(cat)
        }, //Vai setar os valores no categoryForm.
        erro => { alert('Deu merda!!!!' + erro) }
      )
    }
    //OBS: Caso não tenha o pipe com o switchMap ele vai retornar apenas o id vindo na url, então o pipe já traz a categoria sem precisar tratar ela no subscribe.
  }

  public submitForm() {
    if (this.currentAction == 'new') {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }
  
  createCategory() {
    const categoryNew: Category = Object.assign(new Category(), this.categoryForm.value); 
    // OBS: Object.assign é global, ele instancia uma nova categoria injetando os valores vindo do categoryForm.
    this.categoryService.create(categoryNew).subscribe(
      () => {
        this.actionsForSuccess(categoryNew);
      }, 
      error => {
        this.actionsForError(error);
      }
    );
  }
  
  updateCategory() {
    const categoryNew: Category = Object.assign(new Category(), this.categoryForm.value); 
    this.categoryService.update(categoryNew).subscribe(
      () => {
        this.actionsForSuccess(categoryNew);
      }, 
      error => {
        this.actionsForError(error);
      }
    );
  }
  
  actionsForSuccess(categoryNew: Category) {
    if(this.currentAction == 'new'){
      toastr.success("Categoria cadastrada com sucesso.");
      this.router.navigate(['/categories'])      
    }else{
      toastr.success("Categoria atualizada com sucesso.");
      this.router.navigate(['/categories'])
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
