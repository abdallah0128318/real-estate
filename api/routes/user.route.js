import express from 'express'
import {destroy}  from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js';
const router = express.Router();

router.delete('/deleteUser/:id', verifyToken, destroy);

export default router