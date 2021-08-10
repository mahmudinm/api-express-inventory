import express from "express";
import {
    index,
    find,
    store,
    update,
    destroy
} from "../controllers/product.controller.js";
import jwtMiddleware from "../middleware/jwt.middleware.js"
import { validate } from "../validator/product.validator.js";
import { storage } from "../utils/storageMulter.js";
import multer from "multer";

const router = express.Router();

router.use(jwtMiddleware);
router.get('/', index);
router.get('/:id', find);
router.post('/', 
    validate,
    store,
);
router.put('/:id', [
    validate
], update);
router.delete('/:id', destroy);



export default router;