const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Storage Logic
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderName = "others"; // Default folder

    // URL check kore folder name thik kora (Shoro lowercase kore check)
    const url = req.originalUrl.toLowerCase();

    if (url.includes("subcategory")) {
      folderName = "subcategories";
    } else if (url.includes("product")) {
      folderName = "products";
    } else if (url.includes("categor")) {
      folderName = "categories";
    } else if (url.includes("banner")) { // ✅ Single 'banner' thaklei hobe
      folderName = "banners";
    } else if (url.includes("offer")) { // ✅ Offer folder-o add kore rakhlam
      folderName = "offers";
    }

    const folderPath = path.join(process.cwd(), "public/uploads", folderName);

    // Folder na thakle create korbe
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
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
  limits: { fileSize: 10 * 1024 * 1024 }, // Max 10MB
  fileFilter: fileFilter,
});

module.exports = upload;