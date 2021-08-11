import express from "express";
import {
    index,
    store,
    edit,
    update,
    destroy
} from "../controllers/barang.controller.js";
import { validate, updateValidate } from "../validator/barang.validator.js";

const router = express.Router();

router.get('/', index);
router.post('/store', validate, store);
router.get('/edit/:id', edit);
router.put('/update/:id', updateValidate, update);
router.delete('/delete/:id', destroy);

export default router;