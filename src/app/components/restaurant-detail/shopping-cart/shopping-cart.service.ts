import { Injectable } from "@angular/core";

import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";

import { NotificationService } from "app/components/shared/messages/notification.service";

@Injectable()
export class ShoppingCartService {
  items: CartItem[] = [];

  constructor(private notidicationService: NotificationService) {}

  clear() {
    this.items = [];
  }

  addItem(item: MenuItem) {
    let foundItem = this.items.find(mItem => mItem.menuItem.id === item.id);

    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CartItem(item));
    }

    this.notidicationService.notify(`Você adicionou o item ${item.name}`);
  }

  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);

    this.notidicationService.notify(
      `Você removeu o item ${item.menuItem.name}`
    );
  }

  total(): number {
    return this.items
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0);
  }

  increaseQty(item: CartItem) {
    item.quantity++;
  }

  decreaseQty(item: CartItem) {
    item.quantity--;

    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }
}
