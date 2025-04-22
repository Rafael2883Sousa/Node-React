const express = require('express');
const router = express.Router();
const LivroController = require('../Controllers/Controller');
const controller = new LivroController();

router.get('/', controller.getAll.bind(controller));
router.post('/', controller.add.bind(controller));
router.get('/:id', controller.getById.bind(controller));

module.exports = router;
