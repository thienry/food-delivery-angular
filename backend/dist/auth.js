"use strict";
exports.__esModule = true;
var users_1 = require("./users");
var api_config_1 = require("./api-config");
var jwt = require("jsonwebtoken");
exports.handleAuthentication = function (req, res) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        var token = jwt.sign({ sub: dbUser.email, iss: "fd-api" }, api_config_1.apiConfig.secret);
        res.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    }
    else {
        res.status(403).json({ message: "Login ou Senha Invalidos." });
    }
};
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = users_1.users[user.email];
    return dbUser !== undefined && dbUser.matches(user);
}
