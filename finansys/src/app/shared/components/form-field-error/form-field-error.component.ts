import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{ errorMessage }}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input("form-control") formControl: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    } else {
      return null;
    }
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors.required) {
      return "Campo obrigatório!"
    } else if (this.formControl.errors.minlength) {
      //Esse cara ver qual o tamanho que é requerido, ou seja, o tamanho minimo;
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `deve ter no mínimo ${requiredLength} caracteres!`
    } else if (this.formControl.errors.maxlength) {
      const requiredLength = this.formControl.errors.maxlength.requiredLength;
      return `deve ter no máximo ${requiredLength} caracteres!`
    } else if (this.formControl.errors.email) {
      return "email inválido!"
    }
    else {
      return null;
    }
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

}
