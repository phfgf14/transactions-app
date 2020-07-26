const express = require('express');
const transactionRouter = express.Router();

const service = require('../services/transactionService');

transactionRouter.get('/', service.errParam);
transactionRouter.get('/period=:period', service.findAll);
transactionRouter.get('/id=:id', service.findID);
transactionRouter.put('/id=:id', service.update);
transactionRouter.delete('/id=:id', service.remove);
transactionRouter.post('', service.create);

module.exports = transactionRouter;
