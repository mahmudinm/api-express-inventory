import express from "express";
import multer from "multer";
import userRoute from "./product.route.js";
import authRoute from "./auth.route.js";
import shopRoute from "./shop.route.js";
import barangRoute from "./barang.route.js";
import roleRoute from "./role.route.js";
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

router.use('/', authRoute);
router.use('/shop', shopRoute);
router.use('/role', roleRoute);
router.use('/product', userRoute);
router.use('/barang', barangRoute);

export default router;