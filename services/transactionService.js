const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
// const TransactionModel = require('../models/TransactionModel');

const transactionModel = require('../models/TransactionModel.js');

const errParam = (_, res) => {
  res.send({
    error:
      '"É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm"',
  });
};

// Endpoint para consultar os lancamentos do periodo
const findAll = async (req, res) => {
  const data = req.params.period;
  try {
    const transaction = await transactionModel
      .find({ yearMonth: data })
      .sort({ day: 1, category: 1, description: 1 });

    if (!transaction) {
      res.status(404).send('Lançamento(s) não encontrado(s)');
    }
    const countTransaction = await transactionModel.countDocuments({
      yearMonth: data,
    });

    const arrayTransaction = {
      length: countTransaction,
      transactions: transaction,
    };
    res.send(arrayTransaction);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Endpoint para consultar o lancamento
const findID = async (req, res) => {
  const data = req.params.id;
  try {
    const transaction = await transactionModel.findById(
      { _id: data },
      req.body
    );
    if (!transaction) {
      res.status(404).send('Lançamento não encontrado');
    } else {
      res.send(transaction);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Endpoint para alterar o lancamento
const update = async (req, res) => {
  const transactionID = req.params.id;
  try {
    const data = req.body;
    const { description, value, category, yearMonthDay, type } = data;
    const yearMonth = yearMonthDay.substring(0, 7);
    const transactionData = {
      description: description,
      value: value,
      category: category,
      year: parseInt(yearMonthDay.substring(0, 4), 10),
      month: parseInt(yearMonthDay.substring(5, 7), 10),
      day: parseInt(yearMonthDay.substring(8), 10),
      yearMonth: yearMonth,
      yearMonthDay: yearMonthDay,
      type: type,
    };

    const transaction = await transactionModel.findOneAndUpdate(
      { _id: transactionID },
      transactionData
    );
    if (!transaction) {
      res.status(404).send('Lançamento não encontrado');
    } else {
      res.send(transactionData);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Endpoint para remover o lancamento
const remove = async (req, res) => {
  const data = req.params.id;
  try {
    const transaction = await transactionModel.findByIdAndRemove({ _id: data });
    if (!transaction) {
      res.status(404).send('Lançamento não encontrado');
    } else {
      res.send(transaction);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Endpoint para novo lancamento
const create = async (req, res) => {
  const transaction = new transactionModel({
    description: req.body.description,
    value: req.body.value,
    category: req.body.category,
    year: parseInt(req.body.yearMonthDay.substring(0, 4), 10),
    month: parseInt(req.body.yearMonthDay.substring(5, 7), 10),
    day: parseInt(req.body.yearMonthDay.substring(8), 10),
    yearMonth: req.body.yearMonthDay.substring(0, 7),
    yearMonthDay: req.body.yearMonthDay,
    type: req.body.type,
  });

  try {
    const data = await transaction.save();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { errParam, findAll, findID, update, remove, create };
