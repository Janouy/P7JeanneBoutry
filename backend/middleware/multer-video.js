const multer = require("multer");

const MIME_TYPES = {
  'video/mp4': 'mp4',
  'video/avi': 'avi',
  'video/mkv': 'mkv',
  'video/webm': 'webm',
  'video/ogv': 'ogv',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'videos');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage}).single('video');