const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


// CREATE REVIEW
module.exports.createReview = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    const newReview = new Review(req.body.review);

    // Set logged-in user as review author
    newReview.author = req.user._id;

    // Add review to listing
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Created!");

    res.redirect(`/listings/${id}`);
};


// DELETE REVIEW
module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;

    // Remove review reference from Listing
    await Listing.findByIdAndUpdate(id, {
        $pull: {
            reviews: reviewId
        }
    });

    // Delete actual Review
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!");

    res.redirect(`/listings/${id}`);
};