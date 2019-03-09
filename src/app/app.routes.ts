import { Routes } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { RestaurantsComponent } from "./components/restaurants/restaurants.component";
import { RestaurantDetailComponent } from "./components/restaurant-detail/restaurant-detail.component";
import { MenuComponent } from "./components/restaurant-detail/menu/menu.component";
import { ReviewsComponent } from "./components/restaurant-detail/reviews/reviews.component";
import { OrderSummaryComponent } from "./components/order-summary/order-summary.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LoginComponent } from "./components/security/login/login.component";
import { LoggedInGuard } from "./components/security/loggedin.guard";

export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "login/:to", component: LoginComponent },
  { path: "login", component: LoginComponent },
  {
    path: "restaurants/:id",
    component: RestaurantDetailComponent,
    children: [
      { path: "", redirectTo: "menu", pathMatch: "full" },
      { path: "menu", component: MenuComponent },
      { path: "reviews", component: ReviewsComponent }
    ]
  },
  {
    path: "about",
    loadChildren: "./components/about/about.module#AboutModule"
  },
  { path: "restaurants", component: RestaurantsComponent },
  {
    path: "order",
    loadChildren: "./components/order/order.module#OrderModule",
    canLoad: [LoggedInGuard]
  },
  { path: "order-summary", component: OrderSummaryComponent },
  { path: "**", component: NotFoundComponent }
];
