const connection = require('../config/config.bd.js');

const ClosedEndedQuestion = function (question) {
    this.IdClQuestion = question.IdClQuestion;
    this.IdSurvey = question.IdSurvey;
    this.TextClQuestion = question.TextClQuestion;
    this.OrdNumber = question.OrdNumber;
    this.MaxNAnswer = question.MaxNAnswer;
};

ClosedEndedQuestion.create = function (newQuestion, result) {
    connection.query("INSERT INTO closedendedquestion SET ?", newQuestion, function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            result(null, res.insertId);
        }
    });
};

ClosedEndedQuestion.findById = function (id, result) {
    connection.query("SELECT * FROM closedendedquestion WHERE IdClQuestion = ?", id, function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            result(null, res[0]);
        }
    });
};

ClosedEndedQuestion.findAll = function (result) {
    connection.query("SELECT * FROM closedendedquestion", function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

ClosedEndedQuestion.update = function (id, question, result) {
    connection.query("UPDATE closedendedquestion SET IdSurvey=?, TextClQuestion=?, OrdNumber=?, MaxNAnswer=? WHERE IdClQuestion=?",
        [question.IdSurvey, question.TextClQuestion, question.OrdNumber, question.MaxNAnswer, id],
        function (err, res) {
            if (err) {
                console.log("error", err);
                result(null, err);
            } else {
                result(null, res);
            }
        }
    );
};

ClosedEndedQuestion.delete = function (id, result) {
    connection.query("DELETE FROM closedendedquestion WHERE IdClQuestion = ?", [id], function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = ClosedEndedQuestion;