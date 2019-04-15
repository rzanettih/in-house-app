import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingList, ShoppingListItemBought } from 'src/app/shared/shopping-list.model';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.css']
})
export class ShoppingListItemComponent implements OnInit {

  constructor() { }

  @Input() shoppingLinkItem: ShoppingList;

  @Output() delete: EventEmitter<ShoppingList> = new EventEmitter();

  @Output() edit: EventEmitter<ShoppingList> = new EventEmitter();

  @Output() buy: EventEmitter<ShoppingListItemBought> = new EventEmitter();

  ngOnInit() {
  }

  onDelete() {
    this.delete.emit(this.shoppingLinkItem);
  }

  onEdit() {
    this.edit.emit(this.shoppingLinkItem);
  }

  onBuy(price: string) {
    let itemBought: ShoppingListItemBought = {
      id: this.shoppingLinkItem.id,
      itemDescription: this.shoppingLinkItem.itemDescription,
      dateAddedToList: this.shoppingLinkItem.addedDate,
      buyDate: null,
      price: price && price != "" ? Number.parseFloat(price) : null
    };
    this.buy.emit(itemBought);
  }

}
