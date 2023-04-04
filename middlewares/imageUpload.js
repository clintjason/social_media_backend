const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg': 'svg',
    'image/svg+xml': 'svg'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // null means there was no error here.
        // Second argument is the folder name
        callback(null, req.imageFolderPath);
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split('.')[0].split(' ').join('_');
        const extension = path.extname(file.originalname).toLowerCase();
        let fileTypes = /.jpeg|.jpg|.png|.webp|.svg|.gif/;
        if(fileTypes.test(extension)) {
            callback(null, name + '_' + Date.now() + extension);
        }
    }
});

module.exports = multer({
    storage: storage,
    fileFilter: (function (req, file, cb) {
        const extension = path.extname(file.originalname).toLowerCase();
        let fileTypes = /.jpeg|.jpg|.png|.webp|.svg|.gif/;
        if(!fileTypes.test(extension)) {
            cb(new Error("File format Unaccepted"),false);
        } 
        cb(null, true)
    })
}).single('image');