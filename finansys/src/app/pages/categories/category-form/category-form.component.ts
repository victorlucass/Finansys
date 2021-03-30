import { element } from 'protractor';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from "@Angular/router";
import { Category } from './../../../shared/model/category';
import { CategoryService } from './../../../services/category.service';
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
  submittingForm: boolean = false;
  category: Category = new Category();


  constructor(
    private categoryService: CategoryService,
    private route : ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  
  ngOnInit(): void {
    this.setCurrentAction();
    this.categoryFormBuilder();
    this.loadCategory();//Vai carregar a :categoria   
  }
  categoryFormBuilder() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required, Validators.minLength(2)],
      description: [null] 
    })
  }

  loadCategory() {
    if(this.currentAction == 'edit'){
      this.route.params.pipe(
        switchMap(params => this.categoryService.getById(+params.get("id")))//Ele vai carregar a categoria pelo id. 
      ).subscribe(
        cat => { this.category = cat, this.categoryForm.patchValue(cat) }, //Vai setar os valores no categoryForm.
        erro => { alert('Deu merda!!!!') }
      )
    }
  }


  setCurrentAction() {
    if(this.route.snapshot.url[0].path == 'new'){//snapshot.url[0].path -> vai pegar os valores após a url raiz
      this.currentAction = 'new'
    }else{
      this.currentAction = 'edit '
    }
  }

  

  ngAfterContentChecked(): void {//Esse método será efetuada após tudo tiver pronto, ou seja, é o último método ser executada.
    this.setPageTitle();
  }

  setPageTitle() {
    if(this.currentAction == 'new'){
      this.pageTitle = 'Cadastrando nova Categoria: '
    }else{
      const categoryName = this.category.name || '';//Professor usou isso para evitar o delay, pois dá um delay q retorna null, então para na aparecer na tela ele usa ''
      this.pageTitle = 'Cadastrando Categoria ' + categoryName;
    }
  }


}
