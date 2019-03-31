import * as restify from "restify";
import { NotAuthorizedError } from "restify-errors";
import { User } from "../users/users.model";

export const authenticate: restify.RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  User.findByEmail(email, "+password").then(user => { 
    if (user && user.matches(password)) {

    } else {
      return next(new NotAuthorizedError("Invalida Credentials"))
    }
  }).catch(next)
}