const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Storage Logic
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderName = "others";

    // URL check kore folder name thik kora
    const url = req.originalUrl.toLowerCase();

    if (url.includes("product")) {
      folderName = "products";
    } else if (url.includes("categor")) {
      // 'category' ba 'categories' duto-i pabe
      folderName = "categories";
    } else if (url.includes("subcategory")) {
      folderName = "subcategories";
    }

    const folderPath = path.join(process.cwd(), "public/uploads", folderName);

    // Folder na thakle create korbe
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    // Unique file name: fieldname-timestamp-random.extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

// File Filter: Shudhu images allow kora
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png, webp) are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB per file
  fileFilter: fileFilter,
});

module.exports = upload;
