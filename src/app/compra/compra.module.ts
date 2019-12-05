import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompraComponent } from './compra.component';
import { ItensCompraComponent } from './itens-compra/itens-compra.component';
import { CustoEntregaComponent } from './custo-entrega/custo-entrega.component';
import { SharedModule } from 'app/shared/shared.module';
import { SairCompraGuard } from './sair-compra.guard';

// Aula 123 10:00 - canDeactivate
const ROUTES: Routes = [
  { path: '', component: CompraComponent, canDeactivate: [SairCompraGuard] }
]

// Aula 78 - Criando a Feature Module (Módulo de Compra)
@NgModule({
  declarations: [
    CompraComponent,
    ItensCompraComponent,
    CustoEntregaComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)  // Aula 77 2:40
  ]
})
export class CompraModule {}
