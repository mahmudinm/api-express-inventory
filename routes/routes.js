import express from "express";
import multer from "multer";
import userRoute from "./product.route.js";
import authRoute from "./auth.route.js";
import shopRoute from "./shop.route.js";
import jwtMiddleware from "../middleware/jwt.middleware.js"
import { validate } from "../validator/product.validator.js";
import { body, check, checkSchema, validationResult } from "express-validator";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('authenticated');
});
router.get('/cek_auth', jwtMiddleware, (req, res) => {
    res.send('authenticated');
});

router.use('/products', userRoute);
router.use('/shops', shopRoute);
router.use('/', authRoute);

export default router;