import express from "express";
import * as authController from "../controller/users.mjs";
//const app = express();
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";

const router = express.Router();

const validateLogin = [
  body("userid")
    .trim()
    .isLength({ min: 4 })
    .withMessage("최소 4자 이상 입력")
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage("특수문잔 사용불가"),
  body("password").trim().isLength({ min: 8 }).withMessage("8자 이상 입력"),
  validate,
];
//withMessage(): 앞선 조건식이 실패했을 시, 서버(사용자에겐 미노출)에 괄호 안 문자열을 출력?

const validateSignup = [
  ...validateLogin,
  body("name").trim().notEmpty().withMessage("name을 입력"),
  body("email").trim().isEmpty().withMessage("이메일 형식 확인"),
];

// 회원가입
// POST
// http://127.0.0.1:8080/auth/signup
router.post("/signup", validateSignup, authController.signUp);

// 로그인
// POST
// http://127.0.0.1:8080/auth/login
router.post("/login", validateLogin, authController.login);

// 로그인 유지
// http://127.0.0.1:8080/auth/me
router.get("/me", authController.userCheck);

//로그아웃
// http://127.0.0.1:8080/auth/logout
router.get("/logout", authController.logout);

export default router;
