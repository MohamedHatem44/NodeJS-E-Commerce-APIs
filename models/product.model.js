const mongoose = require("mongoose");
/*-----------------------------------------------------------------*/
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [20, "Too short product description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      max: [200000, "Too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],

    image: {
      type: String,
      required: [true, "Product Image cover is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong to category"],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    //To enable virtual populate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
/*-----------------------------------------------------------------*/
// const setImageURL = (doc) => {
//   if (doc.image) {
//     const imageUrl = `${process.env.BASE_URL}/products/${doc.image}`;
//     doc.image = imageUrl;
//   }
// };
/*-----------------------------------------------------------------*/
const setImageURL = (doc) => {
  if (doc.image) {
    // Check if the image URL starts with the base URL
    if (!doc.image.startsWith(process.env.BASE_URL)) {
      // If not, append the base URL
      const imageUrl = `${process.env.BASE_URL}/products/${doc.image}`;
      doc.image = imageUrl;
    } else if (doc.image.startsWith(process.env.BASE_URL + "/products")) {
      // If the image URL already contains '/brands', do nothing
      // This is to prevent appending the base URL multiple times
      return;
    } else {
      // If the image URL starts with the base URL but not with '/brands',
      // append '/brands' to the image path
      const imageUrl = `${process.env.BASE_URL}/products/${doc.image.split("/").pop()}`;
      doc.image = imageUrl;
    }
  }
};
/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/
// findOne, findAll and update
productSchema.post("init", (doc) => {
  setImageURL(doc);
});
/*-----------------------------------------------------------------*/
// create
productSchema.post("save", (doc) => {
  setImageURL(doc);
});
/*-----------------------------------------------------------------*/

//Populate reviews
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

/*-----------------------------------------------------------------*/
// Mongoose query middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name -_id",
  });
  next();
});
/*-----------------------------------------------------------------*/
// Mongoose query middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "brand",
    select: "name -_id",
  });
  next();
});
/*-----------------------------------------------------------------*/
// Class Product
const ProductModel = mongoose.model("Product", productSchema);
/*-----------------------------------------------------------------*/
module.exports = ProductModel;
/*-----------------------------------------------------------------*/
