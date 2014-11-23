
/**
 * Module dependencies.
 */

var Distance = require('google-distance-matrix');
var thunkify = require('thunkify-wrap');

/**
 * Google credentials
 */

var API_KEY = process.env.GOOGLE_API_KEY;
Distance.key(API_KEY);

/**
 * Expose thunkified Google client.
 */

module.exports = thunkify(Distance);
