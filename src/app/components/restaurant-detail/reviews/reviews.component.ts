import { Component, OnInit } from "@angular/core";
import { RestaurantService } from "app/components/restaurants/restaurants.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "mt-reviews",
  templateUrl: "./reviews.component.html"
})
export class ReviewsComponent implements OnInit {
  reviews: Observable<any>;

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.reviews = this.restaurantService.reviewsOfRestaurants(
      this.route.parent.snapshot.params["id"]
    );
  }
}
