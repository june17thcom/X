//import mongoose from "mongoose";
import Mongoose from "mongoose";
import { useVirtualId } from "../db/database.mjs";

const userSchema = new Mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    url: String,
  },
  { versionKey: false }
  // 일종의 백그라운드로 들어가는, 데이터의 버전을 알려주는 값. 관리엔 용이하겠지만 현재로선 불요하기에 스킵
);

useVirtualId(userSchema);
const User = Mongoose.model("User", userSchema); //데이터명은 기본이 단수여야 데이터명은 복수 s가 붙음

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

export async function findByUserid(userid) {
  return User.findOne({ userid });
}

//아이디를 바탕으로 옵젝 아이디를 새로 생성
export async function findByid(id) {
  return User.findById(id);
}
