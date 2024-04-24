const multer = require('multer');
const path = require('path');

// konfigurasi penyimpanan 
const storage = multer.diskStorage({
    destination:'public/images',
    filename: function(req, file, cb){
    cb(null, Date.now() + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});

// validasi type file

function checkTypeFile(file, cb)
{
    const fileType = /jpg|png|jpeg|gif/;
    const extName = fileType.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileType.test(file.mimetype);
    if (extName == mimeType)
    {
        return cb(null, true);
    } else {
        cb('Invalid type file');
    }
}

// fungsi upload

const upload = multer({
    storage:storage,
    limits: {fileSize:3000000},
    fileFilter: function(req, file, cb)
    {
        checkTypeFile(file, cb);
    }
}).single('image');

module.exports = { upload };

