import * as restify from "restify";
import { Router } from "../common/router";
import { User } from "./users.model";

class UsersRouter extends Router {
  applyRoutes(application: restify.Server) {
    application.get("/users", (req, res, next) => {
      User.find().then(users => {
        res.json(users);
        return next();
      });
    });

    application.get("/users/:id", (req, res, next) => {
      User.findById(req.params.id).then(user => {
        if (user) {
          res.json(user);
          return next();
        }
        res.send(404);
        return next();
      });
    });

    application.post("/users", (req, res, next) => {
      let user: any = new User(req.body);
      user.save().then(user => {
        user.password = undefined;
        res.json(user);
        return next();
      });
    });

    application.put("/users/:id", (req, res, next) => {
      const options = { overwrite: true };
      User.update({ _id: req.params.id }, req.body, options)
        .exec()
        .then((cmdResult: any) => {
          if (cmdResult.result.n) {
            return User.findById(req.params.id);
          } else {
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
      User.findByIdAndUpdate(req.params.id, req.body, options).then(user => {
        if (user) {
          res.json(user);
          return next();
        } else {
          res.send(404);
          return next();
        }
      });
    });

    application.del("/users/:id", (req, res, next) => {
      User.remove({ _id: req.params.id })
        .exec()
        .then((cmdResult: any) => {
          if (cmdResult.result.n) {
            res.send(204)
          } else {
            res.send(404)
          }
          return next()
        });
    });
  }
}

export const usersRouter = new UsersRouter();
