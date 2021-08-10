import jwt from "jsonwebtoken";

const decodeJwt = (authorization) => {
    const usertoken = authorization;
    const token     = usertoken.split(' ');
    const decoded   = jwt.verify(token[1], 'shhhhhhared-secret');

    return decoded;
};

export default decodeJwt