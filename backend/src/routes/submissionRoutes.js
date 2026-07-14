const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
console.log("authMiddleware:", typeof authMiddleware);
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
    uploadCodeSubmission
} = require("../controllers/submissionController");

router.post(
  "/upload",
  authMiddleware,
  upload.single("codeFile"),
  uploadCodeSubmission
);

module.exports = router;