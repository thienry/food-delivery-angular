import { Component, OnInit } from "@angular/core";
import { RestaurantService } from "app/components/restaurants/restaurants.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { MenuItem } from "../menu-item/menu-item.model";

@Component({
  selector: "mt-menu",
  templateUrl: "./menu.component.html"
})
export class MenuComponent implements OnInit {
  menu: Observable<MenuItem[]>;

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.menu = this.restaurantService.menuOfRestaurant(
      this.route.parent.snapshot.params["id"]
    );
  }

  addMenuItem(item: MenuItem) {
    console.log(item)
  }
}
