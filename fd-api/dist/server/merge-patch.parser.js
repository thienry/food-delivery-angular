"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mpContentType = "application/merge-patch+json";
exports.mergePatchBodyParser = (req, res, next) => {
    if (req.getContentType() === mpContentType && req.method === "PATCH") {
        req.rawBody = req.body;
        try {
            req.body = JSON.parse(req.body);
        }
        catch (e) {
            return next(new Error(`Invalid Content: ${e.message}`));
        }
    }
    return next();
};
