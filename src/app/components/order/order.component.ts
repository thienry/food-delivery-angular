import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { OrderService } from "./order.service";

import { RadioOption } from "../shared/radio/radio-option.model";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { Order, OrderItem } from "./order.model";

@Component({
  selector: "mt-order",
  templateUrl: "./order.component.html"
})
export class OrderComponent implements OnInit {
  delivery: number = 8;

  paymentOptions: RadioOption[] = [
    { label: "Dinheiro", value: "MON" },
    { label: "Cartão de Débito", value: "DEB" },
    { label: "Cartão Refeição", value: "REF" }
  ];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {}

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.removeItem(item);
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems().map(
      (item: CartItem) => new OrderItem(item.quantity, item.menuItem.id)
    );

    this.orderService.checkOrder(order).subscribe((orderId: Order) => {
      this.router.navigate(["/order-summary"]);
      this.orderService.clear();
    });
    console.log(order);
  }
}
