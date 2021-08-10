
import { check, validationResult } from "express-validator";
import User from "../models/user.model.js";

export const loginValidate = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username Is Required')
        .isLength({ max: 25 })
        .bail()
        .withMessage('Username Maximal 25 Character')
        .trim()
        .escape(),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password Is Required')
        .trim()
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

export const registerValidate = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username Is Required')
        .bail()
        .isLength({ max: 25 })
        .withMessage('Username Maximal 25 Character')
        .bail()
        .trim()
        .escape()
        .custom(value => {
            return User.findOne({ where: { username: value }}).then(user => {
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
        .trim()
        .escape()
        .custom(value => {
            return User.findOne({ where: { email: value } }).then(user => {
                if (user) {
                    return Promise.reject('Email has already taken');
                }
            })
        }),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password Is Required')
        .trim()
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];
