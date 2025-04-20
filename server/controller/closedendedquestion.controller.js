const ClosedEndedQuestion = require('../model/closedendedquestion.model');

exports.findAll = function (req, res) {
    ClosedEndedQuestion.findAll(function (err, question) {
        if (err) res.send(err);
        res.send(question);
    });
};

exports.create = function (req, res) {
    const newQuestion = new ClosedEndedQuestion(req.body);
  
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
      ClosedEndedQuestion.create(newQuestion, function (err, question) {
        if (err) res.status(500).send(err);
        else res.json({ error: false, message: "Closed-ended question created", result: question });
      });
    }
  };

exports.findById = function (req, res) {
    ClosedEndedQuestion.findById(req.params.id, function (err, question) {
        if (err) res.send(err);
        res.json(question);
    });
};

exports.update = function (req, res) {
    ClosedEndedQuestion.update(req.params.id, req.body, function (err, result) {
      if (err) res.status(500).send(err);
      else res.json({ error: false, message: "Question updated", result });
    });
  };

exports.delete = function (req, res) {
    ClosedEndedQuestion.delete(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json({ error: false, message: "Closed-ended question successfully deleted", data: result });
    });
};