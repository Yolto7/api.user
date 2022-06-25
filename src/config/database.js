const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const host = "mongodb+srv://joaquin:1qazxcvfr4JN@coffeedb.5h14h.mongodb.net/coffeeDB";

    await mongoose.connect(host);
    console.log("Database connected");
  } 
  catch (error) {
    throw new Error("Error to connect database");
  }
};

module.exports = { dbConnection };
