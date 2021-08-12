import jwt from "jsonwebtoken";

const decodeJwt = (authorization) => {
    const usertoken = authorization;
    const token     = usertoken.split(' ');
    const decoded   = jwt.verify(token[1], process.env.JWT_SECRET);

    return decoded;
};

export default decodeJwt