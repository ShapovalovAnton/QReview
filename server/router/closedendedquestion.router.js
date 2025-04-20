const express = require('express');
const router = express.Router();
const Controller = require('../controller/closedendedquestion.controller');

router.get('/', Controller.findAll);
router.post('/', Controller.create);
router.get('/:id', Controller.findById);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.delete);

// router.post('/put/:id', Controller.update);

// router.get('/delete/:id', Controller.delete);

module.exports = router;
