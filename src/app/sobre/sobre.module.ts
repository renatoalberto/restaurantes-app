import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SobreComponent } from "./sobre.component";

const ROUTES: Routes = [                    // aula 76 9:30
  {path: '', component: SobreComponent}
]

@NgModule({                                // Aula 76 4:00 - Modularizando o componente SobreComponent 
  declarations: [SobreComponent],
  imports: [RouterModule.forChild(ROUTES)] // aula 76 10:30
})
export class SobreModule { }
