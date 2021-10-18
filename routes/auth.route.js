import express from "express";
import {
    postLogin,
    postRegister,
    getProfile
} from "../controllers/auth.controller.js";
import isLogin from "../middleware/jwt.middleware.js"
import { loginValidate, registerValidate } from "../validator/auth.validator.js";

const router = express.Router();

router.get('/profile', isLogin, getProfile);
router.post('/login', loginValidate, postLogin);
router.post('/register', registerValidate, postRegister);

export default router;