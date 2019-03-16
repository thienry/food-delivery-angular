const users = [
  { name: "Thiago Moura", email: "thiago@gmail.com" },
  { name: "Priscila Borges", email: "priscila@gmail.com" }
];

export class User {
  static findAll(): Promise<any[]> {
    return Promise.resolve(users);
  }
}
