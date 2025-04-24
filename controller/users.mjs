import e from "express";
import * as authRepository from "../data/auth.mjs";

//로그인
//모든 포스트 / 해당 아이디에 대한 포스트를 가져오는 함수
export async function login(req, res, next) {
  /*
  const userid = req.query.userid;
  const password = req.query.password;
  */
  const { userid, password } = req.body;
  const user = await authRepository.login(userid, password);
  if (user) {
    req.session.user = { userid };
    res.status(200).json(`${userid}님 로그인 완료`);
  } else {
    res.status(400).json(`${userid}님 로그인이 실패되셨습니다.`);
  }

  /*
    ? postRepository.login(userid) && postRepository.login(password) // O
    : res.status(500).json(data)); // X
    */
  //res.status(200).json(data);
}

// 로그인 유지: 받아온 정보가 일치할 시에만
//
export async function userCheck(req, res, next) {
  //const userid = req.params.userid;
  const data = await req.session.user;
  if (data) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
} /*else {
    res
      .status(404)
      .json({ message: `${userid}와 일치하는 회원정보가 없습니다.` });
  }*/

// 로그아웃
// 세션에 저장된 유저 정보를 삭제하는 함수
export async function logout(req, res, next) {
  const user = req.session.user; //req.params.userid;
  //const data = await authRepository.userCheck(userid);
  if (user) {
    req.session.destroy(() => {
      res.sendStatus(205); //.json({ message: `로그아웃 되셨습니다.` });
    });
  } else {
    res.status(404).json({
      message: `현재 로그인 돼 있지 않습니다.`,
    });
  }
}

// 회원가입
// 유저를 생성하는 함수
export async function signUp(req, res, next) {
  const { userid, name, password, email } = req.body;
  const users = await authRepository.signUp(
    userid,
    name,
    password,
    email
    //url
  );
  if (users) {
    res.status(201).json(users);
  } else if (users === false) {
    res.status(409).json({ message: `${userid}는 이미 가입된 아이디입니다.` });
  } else {
    res
      .status(404)
      .json({ message: `${userid}의 회원을 생성하는 데 실패했습니다.` });
  }
}
