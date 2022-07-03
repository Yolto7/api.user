const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const host = process.env.HOST_DATABASE;

    await mongoose.connect(host);
    console.log("Database connected");
  } 
  catch (error) {
    throw new Error("Error to connect database");
  }
};

module.exports = { dbConnection };
