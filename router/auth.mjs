import express from "express";
import * as authController from "../controller/users.mjs";
//const app = express();

const router = express.Router();

// 회원가입
// POST
// http://127.0.0.1:8080/auth/signup
router.post("/signup", authController.signUp);

// 로그인
// POST
// http://127.0.0.1:8080/auth/login
router.post("/login", authController.login);

// 로그인 유지
// http://127.0.0.1:8080/auth/me
router.get("/me", authController.userCheck);

//로그아웃
// http://127.0.0.1:8080/auth/logout
router.get("/logout", authController.logout);

export default router;
