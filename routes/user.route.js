import express from "express";
import {
    create,
    destroy,
    edit,
    index,
    store,
    update
} from "../controllers/user.controller.js";
import { validate } from "../validator/user.validator.js";

const router = express.Router();

router.get('/', index);
router.get('/create', create);
router.post('/store', validate, store);
router.get('/edit/:id', edit);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);

export default router;