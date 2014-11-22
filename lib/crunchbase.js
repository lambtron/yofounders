
/**
 * Module dependencies.
 */

var Crunchbase = require('crunchbase');
var thunkify = require('thunkify-wrap');

/**
 * Crunchbase credentials
 */

var USER_KEY = process.env.CRUNCHBASE_USER_KEY;
Crunchbase.init(USER_KEY);

/**
 * Expose Crunchbase client.
 */

module.exports = thunkify(Crunchbase);
