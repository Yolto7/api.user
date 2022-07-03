const User = require("../models/user");
const { createToken, verifyToken } = require("../middlewares");

class EntityRepository {
  async get() {
    let users = await User.find();
    return users;
  }

  async create(entity) {
    const user = new User(entity);
    entity.password = await user.encryptPassword(entity.password);
    return await user.save();
  }

  async update(id, entity) {
    return await User.findByIdAndUpdate(id, entity);
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }

  async login(email, password) {
    const user = await User.findOne({ email });

    // if (user) {
    //   const validPassword = await user.matchPassword(password, user.password);

    //   if (validPassword) {
    //     return await createToken({ id: user.id, type: user.type });
    //   }
    // }
  }
}

module.exports = new EntityRepository();
