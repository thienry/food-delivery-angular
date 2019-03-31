"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const users_model_1 = require("./users.model");
const auth_handler_1 = require("../security/auth.handler");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.findByEmail = (req, res, next) => {
            if (req.query.email) {
                users_model_1.User.findByEmail(req.query.email)
                    .then(user => (user ? [user] : []))
                    .then(this.renderAll(res, next, {
                    pageSize: this.pageSize,
                    url: req.url
                }))
                    .catch(next);
            }
            else {
                next();
            }
        };
        this.on("beforeRender", document => {
            document.password = undefined;
        });
    }
    applyRoutes(application) {
        application.get({ path: `${this.basePath}`, version: "2.0.0" }, [
            this.findByEmail,
            this.findAll
        ]);
        application.get({ path: `${this.basePath}`, version: "1.0.0" }, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
        application.post(`${this.basePath}/authenticate`, auth_handler_1.authenticate);
    }
}
exports.usersRouter = new UsersRouter();
