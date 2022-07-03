const User = require("../models/user");
const { createToken } = require("../middlewares");

class EntityRepository {
  async getById(id) {
    const users = await User.findById(id);
    return users;
  }

  async create(entity) {
    const user = new User(entity);
    user.password = await user.encryptPassword(user.password);
    return await user.save();
  }

  async update(id, entity) {
    return await User.findByIdAndUpdate(id, entity, {new: true});
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    
    if (user) {
      const validPassword = await user.matchPassword(password, user.password);
      
      if (validPassword) {
        return await createToken({ id: user.id, type: user.type });
      }
      else {
        throw new Error('Invalid password');
      }
    }
    else {
      throw new Error('User not found');
    }
  }
}

module.exports = new EntityRepository();
