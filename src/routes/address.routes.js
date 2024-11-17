import express from "express";
import {
  getAllAddressesCon,
  getOneAddressByIdCon,
  createAddressCon,
  updateAddressCon,
  deleteAddressCon,
} from "../controllers/index.js";
import { authGuard } from "../middlewares/index.js";

export const addressRouter = express.Router();

addressRouter.get("/", authGuard, getAllAddressesCon);
addressRouter.get("/:id", authGuard, getOneAddressByIdCon);
addressRouter.post("/", authGuard, createAddressCon);
addressRouter.put("/:id", authGuard, updateAddressCon);
addressRouter.delete("/:id", authGuard, deleteAddressCon);
