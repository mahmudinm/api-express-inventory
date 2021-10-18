import jwt from "express-jwt";

export const isAdmin = (req, res, next) => {
    jwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256']
    })

    console.log(req);

    if (req.role_id == 1) {
        next();
    } else {
        res.status(401).json({
            "message": "Unauthorized"
        });
    }
}