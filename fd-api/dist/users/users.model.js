"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const validators_1 = require("../common/validators");
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
exports.User = mongoose.model("User", userSchema);
