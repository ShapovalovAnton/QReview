const connection = require('../config/config.bd.js');

const survey = function (survey) {
    this.IdSurvey = survey.IdSurvey;
    this.IdClient = survey.IdClient;
    this.NameSurvey = survey.NameSurvey;
    this.AboutSurvey = survey.AboutSurvey;
    this.DateCreateSurvey = survey.DateCreateSurvey;
    this.StatusSurvey = survey.StatusSurvey;
    this.StartDateSurvey = survey.StartDateSurvey;
    this.FinishDateSurvey = survey.FinishDateSurvey;
};

survey.create = function (newSurvey, result) {
    connection.query("INSERT INTO survey SET ?", newSurvey, function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            connection.query("SELECT * FROM survey WHERE IdSurvey = ?", [res.insertId], function (err2, rows) {
                if (err2) {
                    console.log("error", err2);
                    result(null, err2);
                } else {
                    result(null, rows[0]);
                }
            });
        }
    });
};

survey.findById = function (id, result) {
    connection.query("SELECT * FROM survey WHERE IdSurvey = ?", [id], function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

survey.findAll = function (result) {
    connection.query("SELECT * FROM survey", function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            console.log("Survey : ", res);
            result(null, res);
        }
    });
};

survey.update = function (id, surveyData, result) {
    connection.query(
        "UPDATE survey SET IdClient=?, NameSurvey=?, AboutSurvey=?, DateCreateSurvey=?, StatusSurvey=?, StartDateSurvey=?, FinishDateSurvey=? WHERE IdSurvey=?",
        [
            surveyData.IdClient,
            surveyData.NameSurvey,
            surveyData.AboutSurvey,
            surveyData.DateCreateSurvey,
            surveyData.StatusSurvey,
            surveyData.StartDateSurvey,
            surveyData.FinishDateSurvey,
            id,
        ],
        function (err, res) {
            if (err) {
                console.log("error", err);
                result(null, err);
            } else {
                console.log("Survey : ", res);
                result(null, res);
            }
        }
    );
};

survey.delete = function (id, result) {
    connection.query("DELETE FROM survey WHERE IdSurvey = ?", [id], function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            console.log("Survey : ", res);
            result(null, res);
        }
    });
};

module.exports = survey;
