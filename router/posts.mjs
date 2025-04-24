import express from "express";
import * as postController from "../controller/post.mjs";
//const app = express();
const router = express.Router();

//모든 포스트 가져오기
//해당 아이디에 대한 포스트 가져오기
//GET
// http://127.0.0.1:8080/posts
router.get("/", postController.getPost);

//글 번호에 대한 포스트만 가져오기
//GET
// http://127.0.0.1:8080/posts/:id
router.get("/:id", postController.getPostById);

//포스트 쓰기
//POST
// http://127.0.0.1:8080/posts
//json 형태로 입력 후 저장
router.post("/", postController.createPost);

//포스트 수정
//PUT
// http://127.0.0.1:8080/posts
router.put("/:id", postController.updatePost);

// 포스트 삭제하기
// DELETE
// http://127.0.0.1:8080/posts/:id
router.delete("/:id", postController.deletePost);

export default router;
