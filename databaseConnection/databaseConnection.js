require("dotenv").config();
const mongoose = require("mongoose");
const dbUri = process.env.MONGO_DB_URI;

mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Database connected Successfully");
  })
  .catch((error) => {
    console.log(error);
  });
