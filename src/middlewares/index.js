
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const helpers = {};

//MAKING THE FUNCTIONS
helpers.createToken = async (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
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
    const result = jwt.verify(token, process.env.JWT_SECRET);

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