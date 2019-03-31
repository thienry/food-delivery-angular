"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const restify_errors_1 = require("restify-errors");
const users_model_1 = require("../users/users.model");
const environment_1 = require("../common/environment");
exports.authenticate = (req, res, next) => {
    const { email, password } = req.body;
    users_model_1.User.findByEmail(email, "+password")
        .then(user => {
        if (user && user.matches(password)) {
            const token = jwt.sign({ sub: user.email, iss: "fd-api" }, environment_1.environment.security.apiSecret);
            res.json({ name: user.name, email: user.email, accessToken: token });
            return next(false);
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError("Invalid Credentials"));
        }
    })
        .catch(next);
};
