import express from "express";
import {
  getAllUsersCon,
  getOneUserByIdCon,
  registerCon,
  loginCon,
  updateUserCon,
  deleteUserCon,
} from "../controllers/index.js";
import { authGuard } from "../middlewares/index.js";

export const userRouter = express.Router();

userRouter.get("/", authGuard, getAllUsersCon);
userRouter.get("/:id", authGuard, getOneUserByIdCon);
userRouter.post("/register", registerCon);
userRouter.post("/login", loginCon);
userRouter.put("/:id", authGuard, updateUserCon);
userRouter.delete("/:id", authGuard, deleteUserCon);
