import multer from "multer";

export const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, new Date().toISOString() + file.originalname);
    }
});