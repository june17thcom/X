const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  const { userid, password, email, name, phone } = req.body;
  res.status(201).send(
    `${name}님, 회원가입되셨습니다. 
      아이디: ${userid}, 
      비밀번호: ${password}, 
      이메일: ${email}, 
      전화번호: ${phone}.`
  );
});

router.post("/login", (req, res) => {
  const { userid, password } = req.body;
  res
    .status(201)
    .send(`${userid}님, 로그인 되셨습니다. 비밀번호는 ${password}입니다.`);
});

router.put("/user", (req, res) => {
  const { userid, email, name, phone } = req.body;
  res.status(200).send(`${name}님, 회원정보가 
    기존 아이디: ${userid},
    새 이메일: ${email},
    새 전화번호: ${phone},
    로 수정되었습니다.`);
});

router.delete("/user", (req, res) => {
  const { userid } = req.body;
  res.status(200).send(`${userid} 아이디로 탈퇴되셨습니다.`);
});

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: auth API
 *   description: 가입 / 로그인 / 수정 / 탈퇴
 *
 * /signup:
 *   post:
 *     summary: 회원가입
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: 회원(정보) 생성 성공
 *
 * /login:
 *   post:
 *     summary: 로그인
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: 로그인 성공
 *
 * /user:
 *   put:
 *     summary: 회원 정보 수정
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: 수정 성공
 *
 *   delete:
 *     summary: 회원 탈퇴
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *     responses:
 *       200:
 *         description: 탈퇴 성공
 */
