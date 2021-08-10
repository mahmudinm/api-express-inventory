
import { check, checkSchema, validationResult } from "express-validator";
import path from "path";

export const validate = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name Is Required')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Name Must more than 5 Character')
        .trim()
        .escape(),
    check('price')
        .not()
        .isEmpty()
        .withMessage('Price Is Required')
        .bail()
        .isNumeric()
        .withMessage('Price Is An Number')
        .trim()
        .escape(),
    check('image')
        .custom((value, { req }) => {
            if (req.files) {
                return true; 
            } else {
                return false; 
            }
        })
        .withMessage('Image Is Required')
        .bail()
        .custom((value, { req }) => {
            if (req.files.image.size > 1048576) {
                return false; 
            } else {
                return true; 
            }
        })
        .withMessage('Image Is Up to 1MB')
        .bail()
        .custom((value, { req }) => {
            let mimeType = ['image/png', 'iamge/jpg', 'iamge/jpeg'];

            console.log(req.files.image);
            
            if (!mimeType.includes(req.files.image.mimetype)) {
                return false;
            } else {
                return true;
            }
        })
        .withMessage('Image Is must be an jpg, png or jpeg'),
    // checkSchema({
    //     'image': {
    //         custom: {
    //             options: (value, { req, path }) => !!req.files[path].size,
    //             errorMessage: 'You should upload a PDF file up to 10Mb',
    //         },
    //     },
    // }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];
