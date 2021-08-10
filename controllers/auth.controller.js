import User from "../models/user.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import decodeJwt from "../utils/decodeJwt.js";

const JWT_SECRET = process.env.JWT_SECRET

export const postRegister = async (req, res) => {
    try {
        const { body } = req;
        const salt     = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(body.password, salt);
        
        const user = await User.create({
            username: body.username,
            email   : body.email,
            password: password,
        });
        
        res.json({ 
            "message": "Berhasil buat user",
            "user"   : user.toJSON()
        });
    } catch (error) {
        console.log(error);
    }
}

export const postLogin = async (req, res) => {
    try {
        const { body } = req;
        const user = await User.findOne({
            where: { username: body.username }
        });

        if (user) {
            const validPassword = await bcrypt.compare(body.password, user.password);
            const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: 24600, algorithm: 'HS256' });

            if (validPassword) {
                res.json({
                    "token": token,
                    "message": "berhasil login"
                });
            } else {
                res.json({
                    "message": "password salah"
                });
            }
        } else {
            res.json({
                "message": "user tidak ada"
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const getProfile = async (req, res) => {
    try {
        const decoded  = decodeJwt(req.headers.authorization);

        res.json({
            data: decoded
        });
    } catch (error) {
        console.log(error);
    }
}