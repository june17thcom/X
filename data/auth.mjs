import express from "express";

const router = express.Router();

let users = [
  {
    id: "1",
    userid: "apple",
    password: "11111111",
    name: "김사과",
    email: "apple@apple.com",
    url: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: "2",
    userid: "banana",
    password: "2222",
    name: "반하나",
    email: "banana@banana.com",
    url: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    userid: "orange",
    password: "3333",
    name: "오렌지",
    email: "orange@orange.com",
    url: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: "4",
    userid: "berry",
    password: "4444",
    name: "배애리",
    email: "orange@orange.com",
    url: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    id: "5",
    userid: "melon",
    password: "5555",
    name: "이메론",
    email: "orange@orange.com",
    url: "https://randomuser.me/api/portraits/men/29.jpg",
  },
];

// 회원 가입: 회원 정보 작성
export async function signUp(userid, password, name, email) {
  const user = {
    id: Date.now().toString(),
    userid,
    password,
    name,
    email,
    //url,
    url: "https://randomuser.me/api/portraits/men/29.jpg",
  };
  if (users.find((user) => user.userid === userid)) {
    return false;
  } else {
    users = [user, ...users];
    return users;
  }
}

// 로그인
export async function login(userid, password) {
  const user = users.find(
    (user) => user.userid === userid && user.password === password
  );
  if (user) {
    userid, password;
  }
  return user;
}

// 유저 아이디 확인
export async function userCheck(userid) {
  const user = users.find((user) => user.userid === userid);
  if (user) {
    //userid;
    //return userid;
    return true;
  } else {
    return false;
  }
}
/*
//로그아웃
export async function logout(userid) {
  const user = users.find((user) => user.userid === userid);
  if (user) {
    //userid;
    //return userid;
    return true;
  } else {
    return false;
  }
}*/

export async function findByUserid(userid) {
  const user = users.find((user) => user.userid === userid);
  return user;
}

export async function findByid(id) {
  return users.find((user) => user.id === id);
}

export default router;
