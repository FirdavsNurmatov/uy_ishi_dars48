import express from "express";
import { authGuard } from "../middlewares/index.js";
import {
  getAllSocProfilesCon,
  getOneSocProfileByIdCon,
  createSocProfileCon,
  updateSocProfileCon,
  deleteSocProfileCon,
} from "../controllers/index.js";

export const social_ProfileRouter = express.Router();

social_ProfileRouter.get("/", authGuard, getAllSocProfilesCon);
social_ProfileRouter.get("/:id", authGuard, getOneSocProfileByIdCon);
social_ProfileRouter.post("/", authGuard, createSocProfileCon);
social_ProfileRouter.put("/:id", authGuard, updateSocProfileCon);
social_ProfileRouter.delete("/:id", authGuard, deleteSocProfileCon);
