import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RadioOption } from './radio-option.model';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [ { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef( () => RadioComponent ), multi: true } ] // aula 64 3:30
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() opcoes: RadioOption[]

  valor: any
  onChange: any
  onTouched: any

  constructor() { }

  ngOnInit() {
  }

  opcaoSelecionada(valor: any): void {
    this.valor = valor
    this.onChange(valor)
    this.onTouched(valor)
  }

  // Implementando a interface ControlValorAccessor - Aula 64
  /**
   * Write a new value to the element. - Passar um valor para seu componente
   */
  writeValue(obj: any): void {
    this.valor = obj
  }
  /**
   * Set the function to be called when the control receives a change event.
   * Passa uma função para ser executada sempre que o valor interno do componente mudar
   */
  registerOnChange(fn: any): void {            // Aula 129 - dica encontrada nas perguntas - {updateOn: 'change'} no compra.component.ts
    this.onChange = fn
  }
  /**
   * Set the function to be called when the control receives a touch event.
   * Útil para registrar que o usuário entrou no componente
   */
  registerOnTouched(fn: any): void {           // Aula 129 - dica encontrada nas perguntas - {updateOn: 'blur'  } no compra.component.ts
    this.onTouched = fn
  }
  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   * Função chamada quando componente mudar para desabilitado
   *
   * @param isDisabled
   */
  setDisabledState?(isDisabled: boolean): void {}

}
