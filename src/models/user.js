
const { Schema, model } = require('mongoose');

const schema = Schema({
    dni: {
        type: String,
        unique: true,
        required: [true, 'The user DNI is required']
    },
    names: {
        type: String,
        required: [true, 'The user names is required'],
    },
    lastnames: {
        type: String,
        required: [true, 'The user lastnames is required']
    },
    sex: {
      type: String,
      required: [true, 'The user sex is required']
    },
    occupation: {
      type: String,
      required: [true, 'The user occupation is required']
    },
    cellphone: {
      type: Number,
      required: [true, 'The user cellphone is required']
    },
    email: {
      type: String,
      required: [true, 'The user email is required']
    },
    password: {
      type: String,
      required: [true, 'The user password is required']
    },
    type: {
      type: String,
      required: [true, 'The user type is required']
    }
});

schema.methods.toJSON = function() {
    const { __v, _id, ...user } = this.toObject();
    user.id = _id;
    return user;
}

module.exports = model('User', schema );
