const { Router } = require('express');
const { verifyToken } = require('../middlewares')
const controller = require('../controllers/entity.controller');
const router = Router();

router.get('/:id', verifyToken, controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', verifyToken, controller.update.bind(controller));
router.delete('/:id', verifyToken, controller.delete.bind(controller));
router.post('/login', controller.login.bind(controller));

module.exports = router;