import { IProduct, IReview } from "../types/product"
import { IUser, UserByUsername } from "../types/user"

export interface ReviewEligibility {
  canReview: boolean
  reason?: string
  hasReviewed: boolean
}

/**
 * Check if a user can write a review for a product
 */
export const checkProductReviewEligibility = (
  user: IUser | null,
  product: IProduct
): ReviewEligibility => {
  if (!user) {
    return {
      canReview: false,
      reason: "Please sign in to write a review",
      hasReviewed: false,
    }
  }

  // Check if user is a buyer of this product
  const isBuyer = product.buyers.includes(user._id)
  if (!isBuyer) {
    return {
      canReview: false,
      reason: "You must purchase this product to write a review",
      hasReviewed: false,
    }
  }

  // Check if user has already reviewed this product
  const hasReviewed = product.reviews.some(
    (review) => review.user._id === user._id
  )
  if (hasReviewed) {
    return {
      canReview: false,
      reason: "You have already reviewed this product",
      hasReviewed: true,
    }
  }

  return {
    canReview: true,
    hasReviewed: false,
  }
}

/**
 * Check if a user can write a review for a seller
 */
export const checkSellerReviewEligibility = (
  user: IUser | null,
  seller: IUser | UserByUsername["user"],
  existingReviews: IReview[] = []
): ReviewEligibility => {
  if (!user) {
    return {
      canReview: false,
      reason: "Please sign in to write a review",
      hasReviewed: false,
    }
  }

  // Check if user is a buyer of this seller's products
  const isBuyer = seller.buyers?.includes(user._id) || false
  if (!isBuyer) {
    return {
      canReview: false,
      reason: "You must purchase from this seller to write a review",
      hasReviewed: false,
    }
  }

  // Check if user has already reviewed this seller
  const hasReviewed = existingReviews.some(
    (review) => review.user._id === user._id
  )
  if (hasReviewed) {
    return {
      canReview: false,
      reason: "You have already reviewed this seller",
      hasReviewed: true,
    }
  }

  return {
    canReview: true,
    hasReviewed: false,
  }
}

/**
 * Get review eligibility message for display
 */
export const getReviewEligibilityMessage = (
  eligibility: ReviewEligibility
): string => {
  if (eligibility.canReview) {
    return "You can write a review"
  }
  return eligibility.reason || "You cannot write a review"
}
