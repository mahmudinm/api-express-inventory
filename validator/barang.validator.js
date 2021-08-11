
import { check, validationResult } from "express-validator";

export const validate = [
    check('kode')
        .not()
        .isEmpty()
        .withMessage('Kode Is Required')
        .trim()
        .escape(),
    check('nama')
        .not()
        .isEmpty()
        .withMessage('Name Is Required')
        .trim()
        .escape(),
    check('stock')
        .not()
        .isEmpty()
        .withMessage('Stock Is Required')
        .bail()
        .isNumeric()
        .withMessage('Price Is An Number')
        .trim()
        .escape(),
    check('harga')
        .not()
        .isEmpty()
        .withMessage('Harga Is Required')
        .bail()
        .isNumeric()
        .withMessage('Harga Is An Number')
        .trim()
        .escape(),
    check('ukuran')
        .not()
        .isEmpty()
        .withMessage('Ukuran Is Required')
        .trim()
        .escape(),
    check('gambar')
        .custom((value, { req }) => {
            if (req.files) {
                return true; 
            } else {
                return false; 
            }
        })
        .withMessage('Gambar Is Required')
        .bail()
        .custom((value, { req }) => {
            if (req.files.gambar.size > 1048576) {
                return false; 
            } else {
                return true; 
            }
        })
        .withMessage('Gambar Is Up to 1MB')
        .bail()
        .custom((value, { req }) => {
            let mimeType = ['image/png', 'image/jpg', 'image/jpeg'];

            if (!mimeType.includes(req.files.gambar.mimetype)) {
                return false;
            } else {
                return true;
            }
        })
        .withMessage('Gambar Is must be an jpg, png or jpeg'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];


export const updateValidate = [
    check('kode')
        .not()
        .isEmpty()
        .withMessage('Kode Is Required')
        .trim()
        .escape(),
    check('nama')
        .not()
        .isEmpty()
        .withMessage('Name Is Required')
        .trim()
        .escape(),
    check('stock')
        .not()
        .isEmpty()
        .withMessage('Stock Is Required')
        .bail()
        .isNumeric()
        .withMessage('Price Is An Number')
        .trim()
        .escape(),
    check('harga')
        .not()
        .isEmpty()
        .withMessage('Harga Is Required')
        .bail()
        .isNumeric()
        .withMessage('Harga Is An Number')
        .trim()
        .escape(),
    check('ukuran')
        .not()
        .isEmpty()
        .withMessage('Ukuran Is Required')
        .trim()
        .escape(),
    check('gambar')
        .custom((value, { req }) => {
            if (req.files) {
                if (req.files.gambar.size > 1048576) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        })
        .withMessage('Gambar Is Up to 1MB')
        .bail()
        .custom((value, { req }) => {
            let mimeType = ['image/png', 'image/jpg', 'image/jpeg'];

            if (req.files) {
                if (!mimeType.includes(req.files.gambar.mimetype)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true
            }
        })
        .withMessage('Gambar Is must be an jpg, png or jpeg'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];