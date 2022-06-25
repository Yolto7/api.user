const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const helpers = {};

//MAKING THE FUNCTIONS
helpers.encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } 
  catch (err) {
    throw err;
  }
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } 
  catch (err) {
    throw err;
  }
};

helpers.createToken = async (data) => {
  const token = jwt.sign({ data }, "CLINICA", {
    expiresIn: 60*60*24*30,
  });

  return token;
};

helpers.verifyToken = async (req, res, next) => {
  try {
    const bearer = req.headers["authorization"];
    if (!bearer) {
      return res.status(403).json({ msg: "No token provided", status: false });
    }

    const token = bearer.split(" ")[1];
    const result = jwt.verify(token, "CLINICA");

    const user = await User.find({id: result.id});

    if (!user) return res.status(404).json({ data: null, msg: "No user found" });

    next();
  } 
  catch (err) {
    return res.status(400).json({ msg: err.message, status: false });
  }
};




//EXPORTING THE FUNCTIONS
module.exports = helpers;