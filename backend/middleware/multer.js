import multer from "multer";


// Define storage for multer
const storage = multer.diskStorage({
  //   destination: function (req, file, callback) {
  //     callback(null, "uploads/"); // Folder where files will be saved
  //   },
  filename: function (req, file, callback) {
    callback(file.originalname); // Unique filename
  },
});

// File upload settings
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
