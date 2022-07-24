const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = Schema({
  dni: {
    type: String,
    unique: true
  },
  names: {
    type: String,
    required: [true, "The user names is required"],
  },
  lastnames: {
    type: String,
    required: [true, "The user lastnames is required"],
  },
  sex: {
    type: String,
  },
  occupation: {
    type: String,
  },
  cellphone: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, "The user email is required"],
  },
  password: {
    type: String,
    required: [true, "The user password is required"],
  },
  type: {
    type: String,
    default: "PCT",
  },
});

schema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

schema.methods.matchPassword = async (password, passwordSaved) => {
  return await bcrypt.compare(password, passwordSaved);
};

schema.methods.toJSON = function () {
  const { __v, _id, password, type, ...user } = this.toObject();
  user.id = _id;
  return user;
};

module.exports = model("User", schema);
