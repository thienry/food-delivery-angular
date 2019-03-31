import "jest";
import * as request from "supertest";
import { Server } from "../server/server";
import { environment } from "../common/environment";
import { usersRouter } from "./users.router";
import { User } from "./users.model";

let address: string;
let server: Server;

beforeAll(() => {
  environment.db.url =
    process.env.DB_URL || "mongodb://localhost/fd-api-test-db";
  environment.server.port = process.env.SERVER_PORT || 3001;
  address = `http://localhost:${environment.server.port}`;
  server = new Server();
  return server
    .bootstrap([usersRouter])
    .then(() => {
      User.remove({}).exec();
    })
    .catch(console.error);
});

test("get /users", () => {
  return request(address)
    .get("/users")
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.items).toBeInstanceOf(Array);
    })
    .catch(fail);
});

test("post /users", () => {
  return request(address)
    .post("/users")
    .send({
      name: "test",
      email: "test@test.com",
      password: "test123",
      cpf: "06980174479"
    })
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body._id).toBeDefined();
      expect(response.body.name).toBe("test");
      expect(response.body.email).toBe("test@test.com");
      expect(response.body.password).toBeUndefined();
      expect(response.body.cpf).toBe("06980174479");
    })
    .catch(fail);
});

test("get /users/whatever - not found", () => {
  return request(address)
    .get("/users/whatever")
    .then(response => {
      expect(response.status).toBe(404);
    })
    .catch(fail);
});

test("patch /users/:id", () => {
  return request(address)
    .post("/users")
    .send({
      name: "test2",
      email: "test2@test.com",
      password: "test123"
    })
    .then(response =>
      request(address)
        .patch(`/users/${response.body._id}`)
        .send({
          name: "test2 - patch"
        })
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body._id).toBeDefined();
          expect(response.body.name).toBe("test2 - patch");
          expect(response.body.email).toBe("test2@test.com");
          expect(response.body.password).toBeUndefined();
        })
    )
    .catch(fail);
});

afterAll(() => {
  return server.shutDown();
});
