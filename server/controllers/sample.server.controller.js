var Sample = require('../models/sample');
var _ = require('lodash');

exports.create = function(req, res) {
  var sample = new Sample(req.body);

  sample.save(function(err) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(201).json(sample);
    }
  });
};

exports.read = function(req, res) {
  res.json(req.sample);
};

exports.update = function(req, res) {
  var sample = req.sample;

  sample = _.extend(sample, req.body);

  sample.save(function(err) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.json(sample);
    }
  });
};

exports.delete =  function(req, res) {
  var sample = req.sample;

  sample.remove(function(err) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.json(sample);
    }
  });
};

exports.list = function(req, res) {
  Sample.find({}, function(err, samples) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.json(samples);
    }
  });
}

exports.sampleById = function(req, res, next, id) {
  Sample.findById(id, function(err, sample) {
    if (err) return next(err);
    if (!sample) {
      return res.status(404).send(new Error('Sample not found'));
    }
    req.sample = sample;
    next();
  });
}

exports.deleteAll =  function(req, res) {
  Sample.remove({}, function(err) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.send('All samples deleted.');
    }
  });
};
