const entityRepository = require('../repositories/entity.repository');

class EntityService {

  async getById(id) {
    return await entityRepository.getById(id);
  }

  async create(entity) {
    const { id, names, lastnames, email } = await entityRepository.create(entity)
    return { id, names, lastnames, email }
  }

  async update(id, entity) {
    return await entityRepository.update(id, entity) 
  }

  async delete(id) {
    return await entityRepository.delete(id)
  }

  async login(email, password) {
    return await entityRepository.login(email, password);
  }
}

module.exports = new EntityService();