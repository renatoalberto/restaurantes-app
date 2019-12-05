import { EventEmitter } from "@angular/core";


// Aula 86 1:45 - Seviço para notificação do snackbar
export class MensagemService {
  
  notificar = new EventEmitter<any>()

  notifica(menssagem: string): void {
    this.notificar.emit(menssagem)
  }
}