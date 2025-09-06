const express = require("express");
const router = express.Router();
const multer = require("multer");
const chatController = require("../controllers/chatController");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("pdf"), chatController.uploadPDF);
router.post("/ask", chatController.askQuestion);

module.exports = router;
