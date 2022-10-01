import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  border: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;