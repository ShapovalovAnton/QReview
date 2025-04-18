const connection = require('../config/config.bd.js');

const OpenEndedQuestion = function (question) {
    this.IdOpQuestion = question.IdOpQuestion;
    this.IdSurvey = question.IdSurvey;
    this.TextOpQuestion = question.TextOpQuestion;
    this.OrdNumber = question.OrdNumber;
};

OpenEndedQuestion.create = function (newQuestion, result) {
    connection.query("INSERT INTO openendedquestion SET ?", newQuestion, function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            result(null, res.insertId);
        }
    });
};

OpenEndedQuestion.findById = function (id, result) {
    connection.query("SELECT * FROM openendedquestion WHERE IdOpQuestion = ?", id, function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            result(null, res[0]);
        }
    });
};

OpenEndedQuestion.findAll = function (result) {
    connection.query("SELECT * FROM openendedquestion", function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

OpenEndedQuestion.update = function (id, question, result) {
    connection.query("UPDATE openendedquestion SET IdSurvey=?, TextOpQuestion=?, OrdNumber=? WHERE IdOpQuestion=?",
        [question.IdSurvey, question.TextOpQuestion, question.OrdNumber, id],
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

OpenEndedQuestion.delete = function (id, result) {
    connection.query("DELETE FROM openendedquestion WHERE IdOpQuestion = ?", [id], function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = OpenEndedQuestion;