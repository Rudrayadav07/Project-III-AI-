const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("DB is not connected", error);
    process.exit(1);
  }
};

module.exports = ConnectDB;