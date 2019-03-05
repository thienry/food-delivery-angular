import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";

import { Observable } from "rxjs/Observable";

import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";

import { Order } from "./order.model";

import { FD_API } from "../../app.api";

@Injectable()
export class OrderService {
  constructor(private cartService: ShoppingCartService, private http: Http) {}

  cartItems(): CartItem[] {
    return this.cartService.items;
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item);
  }

  itemsValue(): number {
    return this.cartService.total();
  }

  clear(): void {
    this.cartService.clear();
  }

  checkOrder(order: Order): Observable<string> {
    const headers = new Headers();
    headers.append("ContentType", "application/json");

    return this.http
      .post(
        `${FD_API}/orders`,
        JSON.stringify(order),
        new RequestOptions({ headers })
      )
      .map(response => response.json());
  }
}
