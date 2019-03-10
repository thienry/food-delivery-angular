import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { OrderComponent } from "./order.component";
import { OrderItemsComponent } from "./order-items/order-items.component";
import { DeliveryCostsComponent } from "./delivery-costs/delivery-costs.component";

import { LeaveOrderGuard } from "./leave-order.guard";

import { SharedModule } from "../shared/shared.module";

const ROUTES: Routes = [
  { path: "", component: OrderComponent, canDeactivate: [LeaveOrderGuard] }
];

@NgModule({
  declarations: [OrderComponent, OrderItemsComponent, DeliveryCostsComponent],
  imports: [SharedModule, RouterModule.forChild(ROUTES)]
})
export class OrderModule {}
