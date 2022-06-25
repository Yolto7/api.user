const { Router } = require('express');
const { verifyToken } = require('../middlewares')
const controller = require('../controllers/entity.controller');
const router = Router();

router.get('/', verifyToken, controller.get);

router.post('/', controller.create);

router.put('/:id', verifyToken, controller.update);

router.delete('/:id', verifyToken, controller.delete);

router.post('/login', controller.login);


module.exports = router;