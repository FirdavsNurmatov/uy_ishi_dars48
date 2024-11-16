import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneUserById,
  loginUserController,
  updateUser,
} from "../controllers/index.js";
import { authGuard } from "../middlewares/index.js";

export const userRouter = express.Router();

userRouter.get("/all", authGuard, getAllUsers);
userRouter.get("/all/:id", authGuard, getOneUserById);
userRouter.post("/new", createUser);
userRouter.post("/login", loginUserController);
userRouter.put("/update/:id", authGuard, updateUser);
userRouter.delete("/delete/:id", authGuard, deleteUser);
