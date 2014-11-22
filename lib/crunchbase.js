
/**
 * Module dependencies.
 */

var Crunchbase = require('node-crunchbase');
var thunkify = require('thunkify-wrap');

/**
 * Crunchbase credentials
 */

var USER_KEY = process.env.CRUNCHBASE_USER_KEY;

/**
 * Expose Crunchbase client.
 */

module.exports = thunkify(Crunchbase(USER_KEY));
