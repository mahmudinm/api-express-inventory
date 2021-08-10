
import User from "../models/user.model.js";
import { check, validationResult } from "express-validator";

export const validate = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username Is Required')
        .bail()
        .custom(value => {
            return User.findOne({ where: { username: value } }).then(user => {
                if (user) {
                    return Promise.reject('Username has already taken');
                }
            })
        }),
    check('email')
        .not()
        .isEmpty()
        .withMessage('Email Is Required')
        .bail()
        .isEmail()
        .withMessage('Is Must an Email')
        .bail()
        .custom(value => {
            return User.findOne({ where: { email: value } }).then(user => {
                if (user) {
                    return Promise.reject('Username has already taken');
                }
            })
        }),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password Is Required')
        .trim()
        .escape(),
    check('role_id')
        .not()
        .isEmpty()
        .withMessage('Role Is Required')
        .trim()
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

