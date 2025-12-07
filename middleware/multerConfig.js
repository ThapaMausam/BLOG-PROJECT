const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./storage"); // cb(error handle, success handle)
  },
  filename: function (req, file, cb) {
    cb(null, "Mausam - " + file.originalname);
  },
});

module.exports = {
  multer,
  storage,
};
