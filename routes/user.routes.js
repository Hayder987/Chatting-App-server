import express from "express";
import verifyToken from "../middleWare/verifyToken.js";
import { getUsersForSideBar } from "../controller/user.controller.js";

const router = express.Router()

router.get('/', verifyToken, getUsersForSideBar)

export default router;