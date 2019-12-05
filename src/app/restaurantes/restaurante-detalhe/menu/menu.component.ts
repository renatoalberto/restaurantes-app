import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RestaurantesService } from 'app/restaurantes/restaurantes.service';
import { ItemMenu } from '../item-menu/item-menu.model';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menu: Observable<ItemMenu>

  constructor(
    private rs: RestaurantesService,
    private ar: ActivatedRoute
  ) { }

  ngOnInit() {
    this.menu = this.rs.consultaMenuRestaurante(this.ar.parent.snapshot.params['id']) // aula 51 7:00
  }

  adicionaItemMenu(item: ItemMenu): void {
    console.log(item)
  }

}
