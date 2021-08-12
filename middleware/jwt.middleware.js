import jwt from "express-jwt";

const jwtMiddleware = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
})

export default jwtMiddleware;