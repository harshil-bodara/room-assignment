import express from "express";
import { getHome, postDistribute } from "../controllers/distributeController.js";

const roomRouter = express.Router();

roomRouter.get("/", getHome);
roomRouter.post("/distribute", postDistribute);

export default roomRouter;
