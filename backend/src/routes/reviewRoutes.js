const express = require("express");
const router = express.Router();

const { prepareReview } = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/prepare/:submissionId",
  authMiddleware,
  prepareReview
);

module.exports = router;