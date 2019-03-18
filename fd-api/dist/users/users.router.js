"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        application.get("/users", (req, res, next) => {
            users_model_1.User.find().then(users => {
                res.json(users);
                return next();
            });
        });
        application.get("/users/:id", (req, res, next) => {
            users_model_1.User.findById(req.params.id).then(user => {
                if (user) {
                    res.json(user);
                    return next();
                }
                res.send(404);
                return next();
            });
        });
        application.post("/users", (req, res, next) => {
            let user = new users_model_1.User(req.body);
            user.save().then(user => {
                user.password = undefined;
                res.json(user);
                return next();
            });
        });
        application.put("/users/:id", (req, res, next) => {
            const options = { overwrite: true };
            users_model_1.User.update({ _id: req.params.id }, req.body, options)
                .exec()
                .then(result => {
                if (result.n) {
                    return users_model_1.User.findById(req.params.id);
                }
                else {
                    res.send(404);
                }
            })
                .then(user => {
                res.json(user);
                return next();
            });
        });
        application.patch("/users/:id", (req, res, next) => {
            const options = { new: true };
            users_model_1.User.findByIdAndUpdate(req.params.id, req.body, options).then(user => {
                if (user) {
                    res.json(user);
                    return next();
                }
                else {
                    res.send(404);
                    return next();
                }
            });
        });
    }
}
exports.usersRouter = new UsersRouter();
