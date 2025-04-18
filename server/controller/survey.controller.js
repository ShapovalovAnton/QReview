const survey = require('../model/survey.model');

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
exports.findAll = function (req, res) {
    survey.findAll(function (err, data) {
        if (err) res.send(err);
        res.send(data);
        
    });
};

exports.create = function (req, res) {
    const new_survey = new survey(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        survey.create(new_survey, function (err, data) {
            if (err) res.send(err);
            res.json({ error: false, message: "Survey created", data: data });
        });
    }
};

exports.findById = function (req, res) {
    survey.findById(req.params.id, function (err, survey) {
        if (err) res.send(err);
        res.json(survey);
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        survey.update(req.params.id, new survey(req.body), function (err, data) {
            if (err) res.send(err);
            res.json({ error: false, message: "Survey successfully updated", data: data });
        });
    }
};

exports.delete = function (req, res) {
    survey.delete(req.params.id, function (err, data) {
        if (err) res.send(err);
        res.json({ error: false, message: "Survey successfully deleted", data: data });
    });
};

exports.showFrontend = function (req, res) {
    survey.findAll(function (err, data) {
        if (err) res.send(err);

        const drafts = data.filter(s => s.StatusSurvey === 'draft');
        const active = data.filter(s => s.StatusSurvey !== 'draft');

        res.render('index', {
            draft: drafts.map(item => ({
                name: item.NameSurvey,
                date: item.DateCreateSurvey
            })),
            survey: active.map(item => ({
                name: item.NameSurvey,
                start_date: item.StartDateSurvey,
                end_date: item.FinishDateSurvey,
                status: item.StatusSurvey
            }))
        });
    });
};