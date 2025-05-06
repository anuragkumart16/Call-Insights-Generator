import multer from "multer";

let fileCounter = 0; // move this outside

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        fileCounter++;
        cb(null, `${fileCounter}-${file.originalname}`);
    }
});

export const upload = multer({
    storage,
});
