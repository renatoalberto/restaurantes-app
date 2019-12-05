import { NotFoundComponent } from './not-found/not-found.component';
import { CompraConcluidaComponent } from './compra-concluida/compra-concluida.component';
import { Routes, CanLoad } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { RestauranteDetalheComponent } from './restaurantes/restaurante-detalhe/restaurante-detalhe.component';
import { MenuComponent } from './restaurantes/restaurante-detalhe/menu/menu.component';
import { AvaliacoesComponent } from './restaurantes/restaurante-detalhe/avaliacoes/avaliacoes.component';
import { LoginComponent } from './seguranca/login/login.component';
import { RegistradoGuard } from './seguranca/registrado.guard';

export const ROUTES: Routes = [
  {path: ''                , component: HomeComponent                            },
  {path: 'restaurantes/:id', component: RestauranteDetalheComponent,
  children: [
    { path: '', redirectTo: 'menu', pathMatch: 'full'       },  // aula 48 - rotas filhas
    { path: 'menu'         , component: MenuComponent       },
    { path: 'avaliacoes'   , component: AvaliacoesComponent }
  ]},
  {path: 'restaurantes'    , component: RestaurantesComponent                    },
  {path: 'compra'          , loadChildren: './compra/compra.module#CompraModule',   // Lazy-Load aula 77 4:20
    canLoad:     [RegistradoGuard],  // Aula 120 6:30 - Implementando RouterGuard - CanLoad
    canActivate: [RegistradoGuard]   // Aula 121 6:10 - Implementando RouterGuard - CanActivate
  },
  {path: 'sobre'           , loadChildren: './sobre/sobre.module#SobreModule'    }, // Lazy-Load aula 76 8:10
  {path: 'compra-concluida', component: CompraConcluidaComponent                 },
  {path: 'login/:to'       , component: LoginComponent                           }, // Aula 120 11:50 - redirecionar após log
  {path: 'login'           , component: LoginComponent                           }, // Aula 116
  {path: '**'              , component: NotFoundComponent                        }  // Aula 93 - Rota de Wildcard
]
