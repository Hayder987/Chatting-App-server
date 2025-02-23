import express from 'express'
import { getMessages, sendMessage } from '../controller/message.controller.js';
import verifyToken from '../middleWare/verifyToken.js';

const router = express.Router();

router.get('/:id',verifyToken, getMessages)
router.post('/send/:id',verifyToken, sendMessage)

export default router