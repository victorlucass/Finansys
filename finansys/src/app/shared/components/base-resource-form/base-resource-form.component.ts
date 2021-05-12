import { BaseResourceModel } from 'src/app/shared/models/base-resource-model';
import { OnInit, AfterContentChecked, Injector, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from "@Angular/router";
import toastr from 'toastr';
import { switchMap } from "rxjs/operators";
import { BaseResourceService } from '../../services/base-resource.services';

@Injectable()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string; //Vai verificar a ação.
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[];

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    protected resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
   ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.resourceFormBuild();
    this.loadResource();//Vai carregar a :(T)
  }

  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new') {//snapshot.url[0].path -> vai pegar os valores após a url raiz
      this.currentAction = 'new'
    } else {
      this.currentAction = 'edit'
    }
  }

  protected abstract resourceFormBuild(): void;
  //Um método abstrato em uma classe abstrata ela obriga a fazer esse método quando extendida. Assim como as interfaces.

  protected setPageTitle() {
    if (this.currentAction == 'new') {
      this.pageTitle = this.createTitlePage();
    } else {
      // const categoryName = this.category.name || '';
      //Professor usou isso para evitar o delay, pois dá um delay q retorna null, então para na aparecer na tela ele usa ''
      this.pageTitle = this.editionTitlePage();
    }
  }

  protected abstract createTitlePage(): string ;
  protected abstract editionTitlePage(): string;

  protected loadResource() {
    if (this.currentAction == 'edit') {
      this.route.params
        .pipe(
          switchMap(
            params => this.resourceService.getById(+params.id)//Ele vai carregar a categoria pelo id.
          )
        )
        .subscribe(
          (resource) => {
            this.resource = resource,
              this.resourceForm.patchValue(resource)
          }, //Vai setar os valores no resourceForm.
          erro => { alert('Deu merda!!!!' + erro) }
        )
    }
    //OBS: Caso não tenha o pipe com o switchMap ele vai retornar apenas o id vindo na url, então o pipe já traz a categoria sem precisar tratar ela no subscribe.
  }

  public submitForm() {
    if (this.currentAction == 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }
  }



  createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    // OBS: Object.assign é global, ele instancia uma nova categoria injetando os valores vindo do resourceForm.
    this.resourceService.create(resource).subscribe(
      () => {
        this.actionsForSuccess(resource);
      },
      error => {
        this.actionsForError(error);
      }
    );
  }

  updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.update(resource).subscribe(
      () => {
        this.actionsForSuccess(resource);
      },
      error => {
        this.actionsForError(error);
      }
    );
  }

  actionsForSuccess(resource: T) {

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path; //Esse cara vai pegar o localhost:8080/T/*

    if (this.currentAction == 'new') {
      toastr.success("Solicitação processada com sucesso");
      this.router.navigate([baseComponentPath])
    } else {
      toastr.success("Solicitação atualizada com sucesso.");
      this.router.navigate([baseComponentPath])
    }
  }

  actionsForError(error: any) {
    toastr.error("Ops! Algo deu errado!");
    if (error.status == 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Erro no servidor, por favor tente mais tarde.']
    }
  }

  ngAfterContentChecked(): void {
    //Esse método será efetuada após tudo tiver pronto, ou seja, é o último método ser executada.
    this.setPageTitle();
  }

}

