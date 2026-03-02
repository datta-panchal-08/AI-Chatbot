import express from 'express';
import { singleUpload } from '../middleware/multer.js';
import { login, logout, signup } from '../controllers/user.controller.js';
const router = express.Router();

router.post("/signup",singleUpload,signup);
router.post("/login",login);
router.post("/logout",logout);

export default router;