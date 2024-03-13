const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });
const dbUrl = process.env.DB_URL;
console.log("DB_URL:", dbUrl);
/*-----------------------------------------------------------------*/
const dbConnection = () => {
  mongoose
    .connect(dbUrl)
    .then(() => console.log("Connected To MongoDB....."))
    .catch((err) =>
      console.log("Error can not connected to MongoDB!!!!!", err)
    );
};
/*-----------------------------------------------------------------*/
module.exports = dbConnection;
/*-----------------------------------------------------------------*/
