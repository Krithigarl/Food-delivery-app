import express from "express";

import {
  addReview,
  getReviews,
} from "../controller/reviewControllers";

const router = express.Router();

router.post("/", addReview);

router.get("/:productId", getReviews);

export default router;