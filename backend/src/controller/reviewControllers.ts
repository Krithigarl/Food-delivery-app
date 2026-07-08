import { Request, Response } from "express";
import Review from "../model/reviewModel";


// ADD REVIEW
export const addReview = async (
  req: Request,
  res: Response
) => {
  try {
    const review = new Review(req.body);

    await review.save();

    res.status(201).json({
      success: true,
      message: "Review Added",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


// GET REVIEWS
export const getReviews = async (
  req: Request,
  res: Response
) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
    }).sort({ createdAt: -1 });

    const totalRatings = reviews.reduce(
      (acc, item) => acc + item.rating,
      0
    );

    const averageRating =
      reviews.length > 0
        ? totalRatings / reviews.length
        : 0;

    res.json({
      reviews,
      averageRating,
      totalReviews: reviews.length,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};