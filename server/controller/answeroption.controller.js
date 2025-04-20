const AnswerOption = require('../model/answeroption.model');

exports.findAll = function (req, res) {
    AnswerOption.findAll(function (err, option) {
        if (err) res.send(err);
        res.send(option);
    });
};

exports.create = function (req, res) {
    const newOption = new AnswerOption(req.body);

    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
        AnswerOption.create(newOption, function (err, id) {
            if (err) res.send(err);
            res.json({ error: false, message: "Answer option created", id: id });
        });
    }
};

exports.findById = function (req, res) {
    AnswerOption.findById(req.params.id, function (err, option) {
        if (err) res.send(err);
        res.json(option);
    });
};

exports.update = function (req, res) {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
        AnswerOption.update(req.params.id, new AnswerOption(req.body), function (err) {
            if (err) res.send(err);
            res.json({ error: false, message: "Answer option successfully updated" });
        });
    }
};

exports.delete = function (req, res) {
    AnswerOption.delete(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json({ error: false, message: "Answer option successfully deleted", data: result });
    });
};