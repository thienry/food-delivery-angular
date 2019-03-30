"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const restaurants_model_1 = require("./restaurants.model");
class RestaurantsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(restaurants_model_1.Restaurant);
    }
    applyRoutes(application) {
        application.get("/restaurants", [this.validateId, this.findAll]);
        application.get("/restaurants/:id", [this.validateId, this.findById]);
        application.post("/restaurants", [this.validateId, this.save]);
        application.put("/restaurants/:id", [this.validateId, this.replace]);
        application.patch("/restaurants/:id", [this.validateId, this.update]);
        application.del("/restaurants/:id", [this.validateId, this.delete]);
    }
}
exports.restaurantsRouter = new RestaurantsRouter();
