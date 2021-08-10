import express from "express";
import {
    destroy,
    edit,
    index,
    store,
    update
} from "../controllers/supplier.controller.js";
import { validate } from "../validator/supplier.validator.js";

const router = express.Router();

router.get('/', index);
router.post('/store', validate, store);
router.get('/edit/:id', edit);
router.put('/update/:id', validate, update);
router.delete('/delete/:id', destroy);

export default router;