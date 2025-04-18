const express = require('express')

const router=express.Router()
const ClientController = require('../controller/client.controller')

router.get('/', ClientController.findAll);

router.post('/', ClientController.create);

router.get('/:id', ClientController.findById);

router.post('/put/:id', ClientController.update);
// router.put('/:id', ClientController.update);

router.get('/delete/:id', ClientController.delete);
// router.delete('/:id', ClientController.delete);

module.exports=router;