import express from "express";
import {
  createAddress,
  deleteAddress,
  getAllAddresss,
  getOneAddressById,
  updateAddress,
} from "../controllers/index.js";
import { authGuard } from "../middlewares/index.js";

export const addressRouter = express.Router();

addressRouter.get("/all", authGuard, getAllAddresss);
addressRouter.get("/all/:id", authGuard, getOneAddressById);
addressRouter.post("/new", authGuard, createAddress);
addressRouter.put("/update/:id", authGuard, updateAddress);
addressRouter.delete("/delete", authGuard, deleteAddress);
