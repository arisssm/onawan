const multer = require('multer');
const path = require('path');

/** === Konfigurasi Penyimpanan untuk File === */

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let uploadPath = '';
        if (file.mimetype.startsWith('image/')) {
            uploadPath = 'public/images';
            cb(null, uploadPath);
        } else {
            cb(new Error('Unsupported file type'));
        }
    },
    filename: function(req, file, cb){
    // cb(null, Date.now() + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    const uniqueFile = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueFile}${path.extname(file.originalname)}`);
    }
});

function checkTypeFile(file, cb) {
    const fileType = ['image/jpeg', 'image/png', 'image/gif'];
    if (fileType.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'));
    }
}

/** === Konfigurasi fungsi untuk upload File === */

const upload = multer({
    storage:storage,
    limits: {fileSize:3000000},
    fileFilter: function(req, file, cb)
    {
        checkTypeFile(file, cb);
    }
});

module.exports = { upload };