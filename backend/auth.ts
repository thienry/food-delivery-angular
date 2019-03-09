import { Request, Response } from "express";
import { User, users } from "./users";
import { apiConfig } from "./api-config";

import * as jwt from "jsonwebtoken";

export const handleAuthentication = (req: Request, res: Response) => {
  const user = req.body;

  if (isValid(user)) {
    const dbUser = users[user.email];

    const token = jwt.sign(
      { sub: dbUser.email, iss: "fd-api" },
      apiConfig.secret
    );

    res.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
  } else {
    res.status(403).json({ message: "Login ou Senha Invalidos." });
  }
};

function isValid(user: User): boolean {
  if (!user) {
    return false;
  }

  const dbUser = users[user.email];

  return dbUser !== undefined && dbUser.matches(user);
}
