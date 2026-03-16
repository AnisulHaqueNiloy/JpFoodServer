const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path"); // 1. Path module import korun

const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes");
const adminProductRoutes = require("../src/routes/admin/adminProductRoutes");
const categoryRoutes = require("./routes/admin/adminCategorySubcategoryRoutes");

const app = express();

// --- Core Middlewares ---
app.use(cookieParser());
app.use(express.json());

// 2. Multer Static Folder Setup
// Eikhane process.cwd() use kora hoyeche jate VPS-e path milte kono jhamela na hoy
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend-domain.com"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);

// --- Test Route ---
app.get("/", (req, res) => {
  res.send("Bill Generator Server is running");
});

// --- Routes Integration ------
app.use("/api/auth", authRoutes);

// Admin
// Ekhane apnar Admin ebong Product routes gulo add hobe
app.use("/api/admin", adminProductRoutes);
app.use("/api", categoryRoutes);

// --- Error Handling Middlewares ---
app.use(notFound);
app.use(errorHandler);

module.exports = app;
