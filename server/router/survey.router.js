const express = require('express');
const router = express.Router();
const SurveyController = require('../controller/survey.controller');

router.get('/', SurveyController.findAll);
router.post('/', SurveyController.create);
router.get('/:id', SurveyController.findById);
router.put('/:id', SurveyController.update);
router.delete('/:id', SurveyController.delete);


module.exports = router;