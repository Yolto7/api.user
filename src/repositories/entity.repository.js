const model = require("../models/user");
const { createToken } = require("../middlewares");

class EntityRepository {
  static instance
  model

  constructor(model) {
    if(!!EntityRepository.instance) {
      return EntityRepository.instance;
    }

    EntityRepository.instance = this;
    this.model = model;
  }

  async getById(id) {
    const users = await model.findById(id);
    return users;
  }

  async create(entity) {
    const user = new model(entity);
    user.password = await user.encryptPassword(user.password);
    return await user.save();
  }

  async update(id, entity) {
    return await model.findByIdAndUpdate(id, entity, { new: true });
  }

  async delete(id) {
    return await model.findByIdAndDelete(id);
  }

  async login(email, password) {
    const user = await model.findOne({ email });
    
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

module.exports = new EntityRepository(model);
