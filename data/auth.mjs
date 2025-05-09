import { Result } from "express-validator";
import { db } from "../db/database.mjs";

export async function createUser(user) {
  const { userid, password, name, email, url } = user;
  return db
    .execute(
      "insert into users (userid, password, name, email, url) values (?, ?, ?, ?, ?)",
      [userid, password, name, email, url]
    )
    .then((result) => result[0].insertId);

  /*
  const user = {
    id: Date.now().toString(),
    userid,
    password,
    name,
    email,
    url: "https://randomuser.me/api/portraits/men/29.jpg",
  };
  users = [user, ...users];
  return users;
  */
}

export async function login(userid, password) {
  const user = users.find(
    (user) => user.userid === userid && user.password === password
  );
  return user;
}

export async function findByUserid(userid) {
  return db
    .execute("select * from users where userid = ?", [userid])
    .then((result) => result[0][0]);
  //return users.find((user) => user.userid === userid);
}

export async function findByid(idx) {
  //return users.find((user) => user.id === id);
  return db
    .execute("select * from users where idx = ?", [idx])
    .then((result) => result[0][0]);
}
