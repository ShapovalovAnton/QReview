const connection = require('../config/config.bd.js');

const AnswerOption = function (option) {
    this.IdAnsOpt = option.IdAnsOpt;
    this.IdClQuestion = option.IdClQuestion;
    this.TextAnsOpt = option.TextAnsOpt;
};

AnswerOption.create = function (newOption, result) {
    connection.query("INSERT INTO answeroption SET ?", newOption, function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            result(null, res.insertId);
        }
    });
};

AnswerOption.findById = function (id, result) {
    connection.query("SELECT * FROM answeroption WHERE IdAnsOpt = ?", id, function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            result(null, res[0]);
        }
    });
};

AnswerOption.findAll = function (result) {
    connection.query("SELECT * FROM answeroption", function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

AnswerOption.update = function (id, option, result) {
    connection.query("UPDATE answeroption SET IdClQuestion = ?, TextAnsOpt = ? WHERE IdAnsOpt = ?",
        [option.IdClQuestion, option.TextAnsOpt, id],
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

AnswerOption.delete = function (id, result) {
    connection.query("DELETE FROM answeroption WHERE IdAnsOpt = ?", [id], function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = AnswerOption;
