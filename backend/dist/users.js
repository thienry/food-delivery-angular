"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return (another !== undefined &&
            another.email === this.email &&
            another.password === this.password);
    };
    return User;
}());
exports.User = User;
exports.users = {
    "thiago@gmail.com": new User("thiago@gmail.com", "Thiago Moura", "12345"),
    "priscila@gmail.com": new User("priscila@gmail.com", "Priscila Finizola", "12345"),
    "debora@gmail.com": new User("debora@gmail.com", "Debora Finizola", "12345")
};
