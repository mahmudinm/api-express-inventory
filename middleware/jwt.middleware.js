import jwt from "express-jwt";

const isLogin = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
})

export default isLogin;