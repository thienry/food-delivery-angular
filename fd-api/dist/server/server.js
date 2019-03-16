"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const environment_1 = require("../common/environment");
class Server {
    initRoutes() {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: "fd-api",
                    version: "1.0.0"
                });
                this.application.use(restify.plugins.queryParser());
                //routes
                this.application.get("/", [
                    (req, res, next) => {
                        if (req.userAgent() && req.userAgent().includes("MSIE 7.0")) {
                            res.status(400);
                            res.json({ message: "Please, update your browser..." });
                            return next(false);
                        }
                    },
                    (req, res, next) => {
                        // res.contentType = "application/json";
                        // res.setHeader("Content-Type", "application/json");
                        // res.send({ message: "Hello" });
                        res.json({
                            browser: req.userAgent(),
                            method: req.method,
                            url: req.href(),
                            path: req.path(),
                            query: req.query
                        });
                        return next();
                    }
                ]);
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap() {
        return this.initRoutes().then(() => this);
    }
}
exports.Server = Server;
