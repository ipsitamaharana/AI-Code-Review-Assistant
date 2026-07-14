const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
console.log("authMiddleware:", typeof authMiddleware);
const router = express.Router();

const {
    uploadCodeSubmission
} = require("../controllers/submissionController");

router.post(
    "/upload",
    authMiddleware,
    uploadCodeSubmission
);

module.exports = router;