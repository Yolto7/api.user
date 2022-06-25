const User = require('../models/user')
const { encryptPassword, matchPassword, createToken, verifyToken } = require('../middlewares')

class EntityRepository {

  async get() {
    let users = await User.find()
    return users
  }

  async create(entity) {
    entity.password = await encryptPassword(entity.password)
    const user = new User(entity)
    return await user.save()
  }

  async update(id, entity) {
    return await User.findByIdAndUpdate(id, entity) 
  }

  async delete(id) {
    return await User.findByIdAndDelete(id)
  }

  async login(email, password) {
    const user = (await User.find({ email }))[0]

    if (user) {
      const validPassword = await matchPassword(password, user.password)

      if (validPassword) {
        return await createToken({id: user.id, type: user.type})
      }
    }
  }
}

module.exports = new EntityRepository();
