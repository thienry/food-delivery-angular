import * as restify from "restify";
import { Router } from "../common/router";
import { User } from "./users.model";
import { NotFoundError } from "restify-errors";

class UsersRouter extends Router {
  constructor() {
    super();
    this.on("beforeRender", document => {
      document.password = undefined;
      //delete document.password
    });
  }

  applyRoutes(application: restify.Server) {
    application.get("/users", (req, res, next) => {
      User.find()
        .then(this.render(res, next))
        .catch(next);
    });

    application.get("/users/:id", (req, res, next) => {
      User.findById(req.params.id)
        .then(this.render(res, next))
        .catch(next);
    });

    application.post("/users", (req, res, next) => {
      let user: any = new User(req.body);
      user
        .save()
        .then(this.render(res, next))
        .catch(next);
    });

    application.put("/users/:id", (req, res, next) => {
      const options = { runValidators: true, overwrite: true };
      User.findOneAndUpdate({ _id: req.params.id }, req.body, options)
        .then(user => {
          if (user) {
            res.json(user);
            return next();
          } else {
            throw new NotFoundError("Documento não encontrado!");
          }
        })
        .then(this.render(res, next))
        .catch(next);
    });

    application.patch("/users/:id", (req, res, next) => {
      const options = { new: true, runValidators: true };
      User.findByIdAndUpdate(req.params.id, req.body, options)
        .then(this.render(res, next))
        .catch(next);
    });

    application.del("/users/:id", (req, res, next) => {
      User.remove({ _id: req.params.id })
        .exec()
        .then((cmdResult: any) => {
          if (cmdResult.result.n) {
            res.send(204);
          } else {
            throw new NotFoundError("Documento não encontrado!");
          }
          return next();
        })
        .catch(next);
    });
  }
}

export const usersRouter = new UsersRouter();
