import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit { // aula 61

  @Input() label: string
  @Input() mensagemErro: string
  @Input() mostrarMensagem = true

  input: any

  @ContentChild(NgModel) model: NgModel
  @ContentChild(FormControlName) control: FormControlName // aula 72 07:00

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.input = this.model || this.control // aula 72 7:40

    if(this.input === undefined) {
      throw new Error(`Esse componente ${this.label} precisa ser usado com uma diretiva ngModel ou FormControlName`);      
    }
  }

  temSucesso(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  temErro(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }

}
