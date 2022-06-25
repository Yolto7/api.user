const entityService = require("../services/entity.service");

class Controller {
  async get(_req, res) {
    try {
      const users = await entityService.get();
      res.status(200).json({ data: users, status: true });
    } 
    catch (err) {
      console.log(err)
      res.status(400).json({ msg: err.message, status: false });
    }
  }

  async create(req, res) {
    const {
      dni,
      names,
      lastnames,
      sex,
      occupation,
      cellphone,
      email,
      password,
    } = req.body;

    try {
      const data = {
        dni,
        names,
        lastnames,
        sex,
        occupation,
        cellphone,
        email,
        password,
        type: "pacient",
      };

      const user = await entityService.create(data);
      res.status(200).json({ data: user, status: true });
    } 
    catch (err) {
      res.status(400).json({ msg: err.message, status: false });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      dni,
      names,
      lastnames,
      sex,
      occupation,
      cellphone,
      email,
      password,
    } = req.body;

    try {
      const data = {
        dni,
        names,
        lastnames,
        sex,
        occupation,
        cellphone,
        email,
        password,
      };

      const user = await entityService.update(id, data);
      res.status(200).json({ data: user, status: true });
    } 
    catch (err) {
      res.status(400).json({ msg: err.message, status: false });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await entityService.delete(id);
      res.status(200).json({ data: null, status: true });
    } 
    catch (err) {
      res.status(400).json({ msg: err.message, status: false });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const token = await entityService.login(email, password);
      res.status(200).json({ data: token, status: true });
    } 
    catch (err) {
      console.log(err)
      res.status(400).json({ msg: err.message, status: false });
    }
  }
}

module.exports = new Controller();
