const mongoose = require("mongoose");
/*-----------------------------------------------------------------*/
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "Too short Brand name"],
      maxlength: [32, "Too long Brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

/*-----------------------------------------------------------------*/
// const setImageURL = (doc) => {
//   if (doc.image) {
//     const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
//     doc.image = imageUrl;
//   }
// };
/*-----------------------------------------------------------------*/
const setImageURL = (doc) => {
  if (doc.image) {
    // Check if the image URL starts with the base URL
    if (!doc.image.startsWith(process.env.BASE_URL)) {
      // If not, append the base URL
      const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
      doc.image = imageUrl;
    } else if (doc.image.startsWith(process.env.BASE_URL + "/brands")) {
      // If the image URL already contains '/brands', do nothing
      // This is to prevent appending the base URL multiple times
      return;
    } else {
      // If the image URL starts with the base URL but not with '/brands',
      // append '/brands' to the image path
      const imageUrl = `${process.env.BASE_URL}/brands/${doc.image.split("/").pop()}`;
      doc.image = imageUrl;
    }
  }
};
/*-----------------------------------------------------------------*/
// findOne, findAll and update
brandSchema.post("init", (doc) => {
  setImageURL(doc);
});

/*-----------------------------------------------------------------*/
// create
brandSchema.post("save", (doc) => {
  setImageURL(doc);
});
/*-----------------------------------------------------------------*/
// Class Brand
const BrandModel = mongoose.model("Brand", brandSchema);
/*-----------------------------------------------------------------*/
module.exports = BrandModel;
/*-----------------------------------------------------------------*/
