
'use strict';

var express = require('express');
const async = require('async');
const DataLib = require('../src/datalib');

var router = express.Router();


/**
 * GET /api/frequency
 *
 * Retrieve a entity.
 */
router.get('/:wordName', function get (req, res, next) {
    DataLib.readWordFrequency(req.params.wordName, (word) => {
        if (word == null) {
            return res.status(404).json({"message":"Word could not be found: " + req.params.wordName});
        }
        return res.status(200).json({"word": word});
    });
});


/*
request parameters:
  freq
 */
router.post('/:wordName', function createWordFrequency (req, res, next) {
    DataLib.readOrCreateWordFrequency(req.params.wordName, req.body.freq, (word) => {
            if (word == null) {
                return next({message: 'Could not create word frequency \'' + req.params.wordName});
            }
            return res.status(200).json({"word": word});
        });
});


/**
 * Errors on "/api/frequency/*" routes.
 */
router.use(function handleRpcError (err, req, res, next) {
    // Format error and forward to generic error handler for logging and
    // responding to the request
    err.response = {
        message: err.message,
        internalCode: err.code,
    };
    delete err.message;
    next(err);
});

module.exports = router;
