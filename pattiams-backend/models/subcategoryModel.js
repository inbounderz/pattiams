import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Subcategory = mongoose.model("Subcategory", subCategorySchema);

export default Subcategory;