import express from 'express'
import { sendMessage } from '../controller/message.controller.js';
import verifyToken from '../middleWare/verifyToken.js';

const router = express.Router();

router.post('/send/:id',verifyToken, sendMessage)

export default router