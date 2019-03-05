import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { ROUTES } from "./app.routes";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { RestaurantsComponent } from "./components/restaurants/restaurants.component";
import { RestaurantComponent } from "./components/restaurants/restaurant/restaurant.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { RestaurantService } from "./components/restaurants//restaurants.service";
import { RestaurantDetailComponent } from "./components/restaurant-detail/restaurant-detail.component";
import { MenuComponent } from "./components/restaurant-detail/menu/menu.component";
import { ShoppingCartComponent } from "./components/restaurant-detail/shopping-cart/shopping-cart.component";
import { MenuItemComponent } from "./components/restaurant-detail/menu-item/menu-item.component";
import { ReviewsComponent } from "./components/restaurant-detail/reviews/reviews.component";
import { ShoppingCartService } from "./components/restaurant-detail/shopping-cart/shopping-cart.service";
import { OrderService } from "./components/order/order.service";
import { OrderSummaryComponent } from "./components/order-summary/order-summary.component";
import { SharedModule } from "./components/shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    SpinnerComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSummaryComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    SharedModule
  ],
  providers: [
    RestaurantService,
    ShoppingCartService,
    OrderService,
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
