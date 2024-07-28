const mongoose = require("mongoose");
const mongooseURI = "mongodb://localhost:27017/Digital-Diary";
const connectToMongo = async () => {
  await mongoose.connect(mongooseURI);
  console.log("Connected to MongoDB");
};

module.exports = connectToMongo;
