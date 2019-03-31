"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
const users_model_1 = require("../users/users.model");
exports.authenticate = (req, res, next) => {
    const { email, password } = req.body;
    users_model_1.User.findByEmail(email, "+password").then(user => {
        if (user && user.matches(password)) {
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError("Invalida Credentials"));
        }
    }).catch(next);
};
