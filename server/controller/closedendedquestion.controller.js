const ClosedEndedQuestion = require('../model/closedendedquestion.model');

exports.findAll = function (req, res) {
    ClosedEndedQuestion.findAll(function (err, question) {
        if (err) res.send(err);
        res.send(data);
    });
};

exports.create = function (req, res) {
    const newQuestion = new ClosedEndedQuestion(req.body);

    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
        ClosedEndedQuestion.create(newQuestion, function (err, id) {
            if (err) res.send(err);
            res.json({ error: false, message: "Closed-ended question created", id: id });
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
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
        ClosedEndedQuestion.update(req.params.id, new ClosedEndedQuestion(req.body), function (err) {
            if (err) res.send(err);
            res.json({ error: false, message: "Closed-ended question successfully updated" });
        });
    }
};

exports.delete = function (req, res) {
    ClosedEndedQuestion.delete(req.params.id, function (err, result) {
        if (err) res.send(err);
        res.json({ error: false, message: "Closed-ended question successfully deleted", data: result });
    });
};