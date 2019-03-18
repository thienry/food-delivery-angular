"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validators_1 = require("../common/validators");
const environment_1 = require("../common/environment");
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 80, minlength: 3 },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
    },
    password: { type: String, select: false, required: true },
    gender: { type: String, required: false, enum: ["Male", "Female"] },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validators_1.validateCPF,
            message: "{PATH}: Inavlid CPF ({VALUE})"
        }
    }
});
const hashPassword = (obj, next) => {
    bcrypt
        .hash(obj.password, environment_1.environment.security.saltRounds)
        .then(hash => {
        obj.password = hash;
        next();
    })
        .catch(next);
};
const saveMiddleware = function (next) {
    const user = this;
    if (!user.isModified("password")) {
        next();
    }
    else {
        hashPassword(user, next);
    }
};
const updateMiddleware = function (next) {
    if (!this.getUpdate().password) {
        next();
    }
    else {
        hashPassword(this.getUpdate, next);
    }
};
userSchema.pre("save", saveMiddleware);
userSchema.pre("findByIdAndUpdate", updateMiddleware);
userSchema.pre("update", updateMiddleware);
exports.User = mongoose.model("User", userSchema);
