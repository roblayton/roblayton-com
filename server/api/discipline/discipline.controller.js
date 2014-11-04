'use strict';

var _ = require('lodash');
var Discipline = require('./discipline.model');

// Get list of disciplines
exports.index = function(req, res) {
  Discipline.load(function (err, disciplines) {
    if(err) { return handleError(res, err); }
    return res.json(200, disciplines);
  });
};

// Get a single discipline
exports.show = function(req, res) {
  Discipline.findById(req.params.id, function (err, discipline) {
    if(err) { return handleError(res, err); }
    if(!discipline) { return res.send(404); }
    return res.json(discipline);
  });
};

// Creates a new discipline in the DB.
exports.create = function(req, res) {
  Discipline.create(req.body, function(err, discipline) {
    if(err) { return handleError(res, err); }
    return res.json(201, discipline);
  });
};

// Updates an existing discipline in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Discipline.findById(req.params.id, function (err, discipline) {
    if (err) { return handleError(res, err); }
    if(!discipline) { return res.send(404); }
    var updated = _.merge(discipline, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, discipline);
    });
  });
};

// Deletes a discipline from the DB.
exports.destroy = function(req, res) {
  Discipline.findById(req.params.id, function (err, discipline) {
    if(err) { return handleError(res, err); }
    if(!discipline) { return res.send(404); }
    discipline.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Attaches a new skill to a discipline.
exports.attach = function(req, res) {
  Discipline.attach(req.params.id, req.params.skill, function(err, disciplines) {
    if(err) { return handleError(res, err); }
    return res.json(201, disciplines);
  });
};

// Detaches a skill from a discipline.
exports.detach = function(req, res) {
  Discipline.detach(req.params.id, req.params.skill, function(err, disciplines) {
    if(err) { return handleError(res, err); }
    return res.json(201, disciplines);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
