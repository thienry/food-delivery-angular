import { NgModule } from "@angular/core";

import { OrderService } from "app/components/order/order.service";
import { RestaurantService } from "app/components/restaurants/restaurants.service";
import { ShoppingCartService } from "app/components/restaurant-detail/shopping-cart/shopping-cart.service";

@NgModule({
  providers: [OrderService, RestaurantService, ShoppingCartService]
})
export class CoreModule {}
