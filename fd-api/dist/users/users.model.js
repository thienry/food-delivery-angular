"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    { name: "Thiago Moura", email: "thiago@gmail.com" },
    { name: "Priscila Borges", email: "priscila@gmail.com" }
];
class User {
    static findAll() {
        return Promise.resolve(users);
    }
}
exports.User = User;
