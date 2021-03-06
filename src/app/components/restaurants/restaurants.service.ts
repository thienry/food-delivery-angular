import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";

import { Restaurant } from "./restaurant/restaurant.model";
import { MenuItem } from "../restaurant-detail/menu-item/menu-item.model";

import { FD_API } from "../../app.api";

@Injectable()
export class RestaurantService {
  constructor(private http: HttpClient) {}

  restaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams = undefined;

    if (search) {
      params = new HttpParams().append("q", search);
    }

    return this.http.get<Restaurant[]>(`${FD_API}/restaurants`, {
      params: params
    });
  }

  restaurantById(id: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${FD_API}/restaurants/${id}`);
  }

  reviewsOfRestaurants(id: string): Observable<any> {
    return this.http.get(`${FD_API}/restaurants/${id}/reviews`);
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${FD_API}/restaurants/${id}/menu`);
  }
}
