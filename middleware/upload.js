const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads folder if not exists
const uploadPath = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + '-' + Math.round(Math.random() * 1E9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  }
});

// File filter
const fileFilter = (req, file, cb) => {

  if (file.fieldname === "profileImage") {

  const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.heic'];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedImageExtensions.includes(ext)) {
    return cb(null, true);
  } else {
    return cb(new Error("Profile image must be a valid image file"));
  }
}

if (file.fieldname === "certificate") {

  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    return cb(null, true);
  } else {
    return cb(new Error("Certificate must be image or PDF"));
  }
}
}

// 🔥 THIS WAS MISSING
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter
});

module.exports = upload;
