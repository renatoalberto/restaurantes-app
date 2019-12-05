import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';

import { CompraService } from './compra.service';

import { RadioOption } from 'app/shared/radio/radio-option.model';
import { CarrinhoCompras } from 'app/restaurantes/restaurante-detalhe/carrinho-compras/carrinho-compras.model';
import { Compra, ItemCompra } from './compra.model'

@Component({
  selector: 'mt-compra',
  templateUrl: './compra.component.html',
  providers: [CompraService]
})
export class CompraComponent implements OnInit {

  compraForm: FormGroup

  entrega = 8
  orderId: string

  // Email/Number Regex - aula 73 2:20
  emailPattern  = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numeroPattern = /^[0-9]*$/

  opcoesPagamento: RadioOption[] = [
    { label: 'Dinheiro'          , valor: 'Din' },
    { label: 'Cartão de Débito'  , valor: 'Deb' },
    { label: 'Cartão de Crédito' , valor: 'Cre' }
  ]

  constructor(
    private compraService: CompraService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    // this.compraForm = this.formBuilder.group({    // aula 72 - Reactive Forms
    this.compraForm    = new FormGroup({    // Aula 129 - FormControl + updateOn - Controle de evento de todos os atributos
      nome:              new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur' // Aula 129 - FormControl + UpdateOn - Controla individual de evento de validação "Blur", "Change" ou "Submit"
      }),
      email:             this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmacao:  this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      endereco:          this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      numero:            this.formBuilder.control('', [Validators.required, Validators.pattern(this.numeroPattern)]),
      complemento:       this.formBuilder.control(''),
      opcaoPagamento:    this.formBuilder.control('', [Validators.required])
    },
    {validators: [CompraComponent.equalsTo], updateOn: 'blur'}) // Validadores Personalizados 74 - validando email = emailConfirmacao
  }

  // Validadores Personalizados 74 - validando email = emailConfirmacao
  // tslint:disable-next-line: member-ordering
  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const email            = group.get('email')
    const emailConfirmacao = group.get('emailConfirmacao')

    if (!emailConfirmacao || !email) {
      return undefined
    }

    if (email.value === emailConfirmacao.value) {
      emailConfirmacao.setErrors(null) // dica encontrada nas perguntas para deixar emailConfirmacao com erro
      return undefined
    }

    let error = { emailsDivergentes: true  }
    emailConfirmacao.setErrors(error)  // dica encontrada nas perguntas para deixar emailConfirmacao com erro
    return error
  }

  valorTotalCompra(): number {
    return this.compraService.valorTotalCompra()
  }

  itensCarrinhoCompras(): CarrinhoCompras[] {
    return this.compraService.itensCarrinho()
  }

  incrementaItensCarrinhoCompras(item: CarrinhoCompras): void {
    this.compraService.incrementaQuantidadeItens(item)
  }

  decrementaItensCarrinhoCompras(item: CarrinhoCompras): void {
    this.compraService.decrementaQuantidadeItens(item)
  }

  removeItemCarrinhoCompras(item: CarrinhoCompras): void {
    this.compraService.removeItemCarrinho(item)
  }

  finalizaCompra(compra: Compra): void {  // aula 68
    compra.itensCompra = this.compraService.itensCarrinho()
      .map( (item: CarrinhoCompras) => new ItemCompra( item.quantidade, item.itemMenu.id ) )

    this.compraService.finalizaCompra(compra)
      .do((orderId: string) => {
        this.orderId = orderId
      })
      .subscribe((orderId: string) => {
        this.compraService.limparCompra()
        this.router.navigate(['/compra-concluida']) // aula 69 5:20
      })
  }

  // Aula 123 6:30 - Utilizado no sair-compra.guard.ts - decisão para CanDeactivate
  compraFoiCompletada(): boolean {
    return this.orderId !== undefined
  }
}
