import express from "express";
import userRoute from "./user.route.js";
import authRoute from "./auth.route.js";
import barangRoute from "./barang.route.js";
import roleRoute from "./role.route.js";
import supplierRoute from "./supplier.route.js";
import jwtMiddleware from "../middleware/jwt.middleware.js"

const router = express.Router();

router.get('/', (req, res) => {
    res.send('authenticated');
});
router.get('/cek_auth', jwtMiddleware, (req, res) => {
    res.send('authenticated');
});

router.use('/', authRoute);
router.use('/user', userRoute);
router.use('/role', roleRoute);
router.use('/barang', barangRoute);
router.use('/supplier', supplierRoute);

export default router;