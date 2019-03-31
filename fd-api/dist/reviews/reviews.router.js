"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const reviews_model_1 = require("./reviews.model");
const authz_handler_1 = require("../security/authz.handler");
class ReviewsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(reviews_model_1.Review);
        this.findById = (req, res, next) => {
            this.model
                .findById(req.params.id)
                .populate("user", "name")
                .populate("restaurants", "name")
                .then(this.render(res, next))
                .catch(next);
        };
    }
    envelope(document) {
        let resource = super.envelope(document);
        const restId = document.restaurant._id
            ? document.restaurant._id
            : document.restaurant;
        resource._links.restaurant = `/restaurants/${restId}`;
        return resource;
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, [authz_handler_1.authorize("user"), this.save]);
    }
}
exports.reviewsRouter = new ReviewsRouter();
