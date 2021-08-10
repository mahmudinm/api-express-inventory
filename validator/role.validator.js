
import { check, validationResult } from "express-validator";

export const validate = [
    check('nama')
        .not()
        .isEmpty()
        .withMessage('Nama Is Required')
        .trim()
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];
