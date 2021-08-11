import express from "express";
import {
    create,
    destroy,
    edit,
    index,
    store,
    update
} from "../controllers/penjualan.controller.js";

const router = express.Router();

router.get('/', index);
router.get('/create', create);
router.post('/store', store);
router.get('/edit/:id', edit);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);

export default router;