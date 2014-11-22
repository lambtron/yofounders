
/**
 * Module dependencies.
 */

var Pastebin = require('pastebin');
var thunkify = require('thunkify-wrap');

/**
 * Pastebin credentials
 */

var USER_KEY = process.env.PASTEBIN_USER_KEY;

/**
 * Expose thunkified `Pastebin` client.
 */

module.exports = thunkify(Pastebin(USER_KEY));
