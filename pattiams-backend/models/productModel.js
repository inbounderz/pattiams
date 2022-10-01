import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name:{type: String, required: true},
    rating:{type: Number, required: true},
    comment:{type: String, required: true},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
},{
    timestamps: true
}
)

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    category2: {
      type: String
    },
    subCategory: {
      type: String,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    benefits: {
      type: String
    },
    ingredients: {
      type: String
    },
    howToUse: {
      type: String
    },
    variant: {
      type: Array,
      required: true
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    discountPrice: {
      type: Array,
      default: 0,
    },
    categoryslug: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema)

export default Product