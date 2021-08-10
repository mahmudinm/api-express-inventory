
import { check, validationResult } from "express-validator";

export const validate = [
    check('nama')
        .not()
        .isEmpty()
        .withMessage('Nama Is Required')
        .trim()
        .escape(),
    check('no_hp')
        .not()
        .isEmpty()
        .withMessage('Nomor HP Is Required')
        .trim()
        .escape(),
    check('alamat')
        .not()
        .isEmpty()
        .withMessage('Alamat Is Required')
        .trim()
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];
