// import { Response } from '@angular/http' //Aula 108 - refactory para Angula 4.3
import { HttpErrorResponse } from '@angular/common/http' // Aula 108 11:25 - refactory para Angula 4.3
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core'
import { MensagemService } from './shared/mensagens/mensagens.service'
import { LoginService } from './seguranca/login/login.service'

// import { Observable } from 'rxjs/Observable' // Aula 132 - mudou para rxjs no angula 6
// import 'rxjs/add/operator/throw'             // Aula 132 - mudou para rxjs no angula 6
// import { throwError } from 'rxjs/operators'  // Aula 132 - mudou para rxjs no angula 6 * Exemplo Angular 6

/* Aula 126 - Classe comentantada para criação do Error Hendler Global
export class ErrorHandler { // aula 44
  static handleErro(error: HttpErrorResponse | any) {

    let errorMessage: string

    console.log(error)

    if (error instanceof HttpErrorResponse) {
      const body = error.error // Aula 108 12:00
      errorMessage = `Erro ${error.status} ao obter a URL ${error.url} - ${error.statusText || ''} ${body}`
    } else {
      errorMessage = error.toString()
    }

    console.log(errorMessage)

    return Observable.throw(errorMessage)
  }
}
*/

// Aula 126
@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(
    private mensagemService: MensagemService,
    private injector: Injector, // Correção de dependencia ciclica
    private ngZone: NgZone // Aula 127 - Tratamento de zonas, ajuste da apresentação da mensagem, que nunca sai da tela
  ) {
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any) {

    if (errorResponse instanceof HttpErrorResponse) {
      const menssagem = errorResponse.error.mensage

      // Aula 127 - tratamento de zonas - corrige mensagem que nunca some
      this.ngZone.run( () => {
        switch (errorResponse.status) {
          case 401:
            this.injector.get(LoginService).solicitarLog()
            break;
          case 403:
            this.mensagemService.notifica(menssagem || 'Não autorizado.')
            break;
          case 404:
            this.mensagemService.notifica(menssagem || 'Recurso não encontrado. Verifique o console para mais detalhes.')
            break;
        }
      })

    }

    super.handleError(errorResponse)
  }
}
