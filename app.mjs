import express from "express";
import session from "express-session";

import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";

const app = express();
app.use(express.json());

/*
secret: 세션 ID 서명용 키
resave: 매 요청 시 자동 저장 여부 
saveUninitialized: 초기 빈 세션(대충 익명세션 같은 개념) 저장 여부
cookie.secure: HTTPS에서만 전송
 */

app.use(
  session({
    secret: "!QAZXSW@",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use("/posts", postsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(8080, () => {
  console.log("로그인/게시판 서버 실행 중");
});
