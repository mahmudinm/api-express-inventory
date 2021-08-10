import express from "express";
import {
    index,
    store
} from "../controllers/barang.controller.js";

const router = express.Router();

router.get('/', index);
router.post('/', store);

export default router;