import express from "express";
import {
    destroy,
    edit,
    index,
    store,
    update
} from "../controllers/role.controller.js";
import { validate } from "../validator/role.validator.js";

const router = express.Router();

router.get('/', index);
router.post('/', validate, store);
router.get('/edit/:id', edit);
router.put('/:id', validate, update);
router.delete('/:id', destroy);

export default router;