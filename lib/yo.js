
/**
 * Module dependencies.
 */

var Yo = require('yo-api');
var thunkify = require('thunkify-wrap');

/**
 * Crunchbase credentials
 */

var API_TOKEN = process.env.YO_API_TOKEN;

/**
 * Expose thunkified `Yo` client.
 */

module.exports = thunkify(new Yo(API_TOKEN));
