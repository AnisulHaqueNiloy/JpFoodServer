const express = require("express");
const router = express.Router();
const upload = require('../config/multer')

const {
  registerUser,
  loginUser,
  getMe,
  logout,
  updateMe
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/logout", logout);
router.put("/update-me", protect, upload.single("image"), updateMe);

module.exports = router;
