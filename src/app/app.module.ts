import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, PreloadAllModules } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";

import { ROUTES } from "./app.routes";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { RestaurantsComponent } from "./components/restaurants/restaurants.component";
import { RestaurantComponent } from "./components/restaurants/restaurant/restaurant.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { RestaurantDetailComponent } from "./components/restaurant-detail/restaurant-detail.component";
import { MenuComponent } from "./components/restaurant-detail/menu/menu.component";
import { ShoppingCartComponent } from "./components/restaurant-detail/shopping-cart/shopping-cart.component";
import { MenuItemComponent } from "./components/restaurant-detail/menu-item/menu-item.component";
import { ReviewsComponent } from "./components/restaurant-detail/reviews/reviews.component";
import { OrderSummaryComponent } from "./components/order-summary/order-summary.component";

import { SharedModule } from "./components/shared/shared.module";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LoginComponent } from './components/security/login/login.component';
import { UserDetailsComponent } from './components/header/user-details/user-details.component';

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
    NotFoundComponent,
    LoginComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }),
    SharedModule.forRoot()
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
