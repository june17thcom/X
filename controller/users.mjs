import e from "express";
import * as authRepository from "../data/auth.mjs";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = "abcdefg1234%^&*";
const bcryptSaltRounds = 10;
const jwtExpiresInDays = "4d";

async function createJwtToken(id) {
  return jwt.sign({ id }, secretKey, { expiresIn: jwtExpiresInDays });
}

//로그인
//모든 포스트 / 해당 아이디에 대한 포스트를 가져오는 함수
export async function login(req, res, next) {
  const { userid, password } = req.body;
  //const user = await authRepository.login(userid, password);
  const user = await authRepository.findByUserid(userid);
  if (!user) {
    res.status(401).json(`${userid}를 아이디 목록에서 찾을 수 없음!`);
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "비밀번호를 확인해주세요!" });
  }
  const token = await createJwtToken(user.id);
  return res.status(200).json({ token, userid });
}

// 로그인 유지: 받아온 정보가 일치할 시에만
export async function userCheck(req, res, next) {
  //const userid = req.params.userid;
  const data = await req.session.user;
  if (data) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
}

// 로그아웃
// 세션에 저장된 유저 정보를 삭제하는 함수
export async function logout(req, res, next) {
  const user = req.session.user;
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
  // 회원 중복 쳌쳌
  const found = await authRepository.findByUserid(userid);
  if (found) {
    return res.status(409).json({ message: `${userid}이 이미 있습니다.` });
  }
  const hashed = bcrypt.hashSync(password, bcryptSaltRounds);
  const users = await authRepository.signUp(userid, hashed, name, email);
  const token = await createJwtToken(users.id);
  console.log(token);
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

export async function verify(req, res, next) {
  const id = req.id;
  if (id) {
    res.status(200).json(id);
  } else {
    res.status(401).json({ message: "사용자 인증 실패" });
  }
}

export async function me(req, res, next) {
  const user = await authRepository.findByid(req.id);
  if (!user) {
    return res.status(404).json({ message: "일치하는 사용자가 없음" });
  }
  res.status(200).json({ token: req.token, userid: user.userid });
}
