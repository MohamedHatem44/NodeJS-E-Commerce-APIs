const mongoose = require("mongoose");
/*-----------------------------------------------------------------*/
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
    },
    // A and B => shopping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
      required: [true, "Category Image is required"],
    },
  },
  { timestamps: true }
);

const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};
// findOne, findAll and update
categorySchema.post("init", (doc) => {
  setImageURL(doc);
});

// create
categorySchema.post("save", (doc) => {
  setImageURL(doc);
});
/*-----------------------------------------------------------------*/
// Class Category
const CategoryModel = mongoose.model("Category", categorySchema);
/*-----------------------------------------------------------------*/
module.exports = CategoryModel;
/*-----------------------------------------------------------------*/
