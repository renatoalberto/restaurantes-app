import { ItemMenu } from './item-menu.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'mt-item-menu',
  templateUrl: './item-menu.component.html',
  animations: [
    trigger('apareceuItem', [
      state('selecionado', style({opacity: 1})),
      transition('void => selecionado', [
        style({opacity: 0, transform: 'translateY(-10px)'}),
        animate('500ms 0s ease-in')
      ])
    ])
  ]
})
export class ItemMenuComponent implements OnInit {

  estadoItem = 'selecionado'

  @Input() itemMenu: ItemMenu
  @Output() add = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  adicionaItem() {
    this.add.emit(this.itemMenu)
  }
}
