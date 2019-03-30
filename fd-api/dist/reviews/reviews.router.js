"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const reviews_model_1 = require("./reviews.model");
class ReviewsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(reviews_model_1.Review);
    }
    applyRoutes(application) {
        application.get("/reviews", [this.validateId, this.findAll]);
        application.get("/reviews/:id", [this.validateId, this.findById]);
        application.post("/reviews", [this.validateId, this.save]);
        application.put("/reviews/:id", [this.validateId, this.replace]);
        application.patch("/reviews/:id", [this.validateId, this.update]);
        application.del("/reviews/:id", [this.validateId, this.delete]);
    }
}
