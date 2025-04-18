const OpenEndedQuestion = require('../model/openendedquestion.model');

exports.findAll = function (req, res) {
    OpenEndedQuestion.findAll(function (err, question) {
        if (err) res.send(err);
        res.send(data);
    });
};

exports.create = function (req, res) {
    const newQuestion = new OpenEndedQuestion(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        OpenEndedQuestion.create(newQuestion, function (err, id) {
            if (err) res.send(err);
            res.json({ error: false, message: "Question created", data: id });
        });
    }
};

exports.findById = function (req, res) {
    OpenEndedQuestion.findById(req.params.id, function (err, question) {
        if (err) res.send(err);
        res.json(question);
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        OpenEndedQuestion.update(req.params.id, new OpenEndedQuestion(req.body), function (err, data) {
            if (err) res.send(err);
            res.json({ error: false, message: "Question successfully updated", data: data });
        });
    }
};

exports.delete = function (req, res) {
    OpenEndedQuestion.delete(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json({ error: false, message: "Question successfully deleted", data: result });
    });
};