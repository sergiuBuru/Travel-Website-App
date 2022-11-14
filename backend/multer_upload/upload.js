const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // file is stored in folder with the name as the vacation id
    cb(null, 'vacation_images/' + req.params.id)
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  }
  else {
    cb(null, false)
  }
}

let upload = multer({storage, fileFilter});

module.exports = upload