
/**
 * Module dependencies.
 */

var Foursquare = require('node-foursquare-venues');
var thunkify = require('thunkify-wrap');

/**
 * Foursquare credentials
 */

var CLIENT_ID = process.env.FOURSQUARE_CLIENT_ID;
var CLIENT_SECRET = process.env.FOURSQUARE_CLIENT_SECRET;

/**
 * Expose thunkified Foursquare client.
 */

module.exports = thunkify(Foursquare(CLIENT_ID, CLIENT_SECRET));
