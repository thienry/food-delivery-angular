export class User {
  constructor(
    public email: string,
    public name: string,
    private password: string
  ) {}

  matches(another: User): boolean {
    return (
      another !== undefined &&
      another.email === this.email &&
      another.password === this.password
    );
  }
}

export const users = {
  "thiago@gmail.com": new User("thiago@gmail.com", "Thiago Moura", "12345"),
  "priscila@gmail.com": new User(
    "priscila@gmail.com",
    "Priscila Finizola",
    "12345"
  ),
  "debora@gmail.com": new User("debora@gmail.com", "Debora Finizola", "12345")
};
