import express from "express";

const app = express();
const router = express.Router();

//모든 포스트 가져오기
//해당 아이디에 대한 포스트 가져오기
//GET
// http://127.0.0.1:8080/posts
// http://127.0.0.1:8080/posts

//글 번호에 대한 포스트만 가져오기
//GET
// http://127.0.0.1:8080/posts/:id

//포스트 쓰기
//POST
// http://127.0.0.1:8080/posts
//json 형태로 입력 후 저장

//포스트 수정
//PUT
// http://127.0.0.1:8080/posts

//모든 포스트를 리턴
export async function getAll() {
  return posts;
}

//사용자 아이디에 대한 포스트를 리턴
//조건을 만족하는 모든 요소를 배열로 리턴턴
export async function getAllByUserId(userid) {
  return posts.filter((post) => post.userid === userid);
}

//글 번호에 대한 포스트를 리턴
//조건을 만족하는 첫 요소 하나를 리턴
export async function getById(id) {
  return posts.find((post) => post.id === id);
}

// 포스트 작성
export async function create(userid, name, text) {
  const post = {
    id: Date.now().toString,
    userid, //요소명이 같으면 생략 가
    name,
    text,
    createdAt: Date.now().toString,
  };
  posts = [post, ...posts];
  return posts;
}

export default router;

app.listen(8080);
