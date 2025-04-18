const express = require('express');
const router = express.Router();
const OpenEndedQuestionController = require('../controller/openendedquestion.controller');

router.get('/', OpenEndedQuestionController.findAll);
router.post('/', OpenEndedQuestionController.create);
router.get('/:id', OpenEndedQuestionController.findById);
// router.put('/:id', OpenEndedQuestionController.update);
// router.delete('/:id', OpenEndedQuestionController.delete);

router.post('/put/:id', OpenEndedQuestionController.update);

router.get('/delete/:id', OpenEndedQuestionController.delete);

module.exports = router;