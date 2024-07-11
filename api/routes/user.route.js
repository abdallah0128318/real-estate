import express from 'express'
import {destroy, update}  from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js';
const router = express.Router();

router.delete('/deleteUser/:id', verifyToken, destroy);
router.post('/update/:id', verifyToken, update);

export default router