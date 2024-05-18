const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
/*-----------------------------------------------------------------*/
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, //remove white space form string
      required: [true, "name required"],
    },

    //url friendly version of string
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
    },
    phone: String,
    image: String,

    password: {
      type: String,
      required: [true, "password required "],
      minlength: [6, "too short password"],
    },
    passwordChangedAt: Date,
    passwordRestCode: String,
    PasswordResestExpires: Date,
    passwordResetVerified: Boolean,
    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user",
    },
    token: { type: String },
    //if the user is active instead of delete
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
); //option that adds two fields to the schema(createdAt ,updatedAt)
/*-----------------------------------------------------------------*/
//encrypt password pre midllware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //hashing
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
/*-----------------------------------------------------------------*/
// const setImageURL = (doc) => {
//   if (doc.image) {
//     const imageUrl = `${process.env.BASE_URL}/users/${doc.image}`;
//     doc.image = imageUrl;
//   }
// };
/*-----------------------------------------------------------------*/
const setImageURL = (doc) => {
  if (doc.image) {
    // Check if the image URL starts with the base URL
    if (!doc.image.startsWith(process.env.BASE_URL)) {
      // If not, append the base URL
      const imageUrl = `${process.env.BASE_URL}/users/${doc.image}`;
      doc.image = imageUrl;
    } else if (doc.image.startsWith(process.env.BASE_URL + "/users")) {
      // If the image URL already contains '/categories', do nothing
      // This is to prevent appending the base URL multiple times
      return;
    } else {
      // If the image URL starts with the base URL but not with '/categories',
      // append '/categories' to the image path
      const imageUrl = `${process.env.BASE_URL}/users/${doc.image.split("/").pop()}`;
      doc.image = imageUrl;
    }
  }
};
/*-----------------------------------------------------------------*/
userSchema.post("init", (doc) => {
  setImageURL(doc);
});
/*-----------------------------------------------------------------*/
// create
userSchema.post("save", (doc) => {
  setImageURL(doc);
});
/*-----------------------------------------------------------------*/
const User = mongoose.model("User", userSchema);
/*-----------------------------------------------------------------*/
module.exports = User;
/*-----------------------------------------------------------------*/
