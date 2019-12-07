import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Aula 132 - refatorando rxjs para angula 6
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';

import { CompraComponent } from './compra.component';


// Aula 123 - CanDeactivate - Opção para o usuário não abandonar
// a página de compra e perder todas as informações digitadas

export class SairCompraGuard implements CanDeactivate<CompraComponent> {

    canDeactivate(compraComponent: CompraComponent,
                  route: ActivatedRouteSnapshot,
                  state: RouterStateSnapshot): boolean {

      if (!compraComponent.compraFoiCompletada()) {
        return window.confirm('Deseja desistir da compra?')
      } else {
        return true
      }
    }

}
