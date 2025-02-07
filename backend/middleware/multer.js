import multer from "multer";
import path from "path";

// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // Define destination folder for uploaded files
    callback(null, "uploads/"); // Set folder for saving the files
  },
  filename: function (req, file, callback) {
    // Use a unique filename by adding a timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname); // Extract file extension
    callback(null, file.fieldname + "-" + uniqueSuffix + fileExtension); // Set unique filename with extension
  },
});

// File upload settings
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
  fileFilter: function (req, file, cb) {
    // Allow only certain file types (e.g., images)
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true); // Accept the file
    } else {
      cb(new Error("Only image files are allowed!"), false); // Reject the file
    }
  },
});

export default upload;
