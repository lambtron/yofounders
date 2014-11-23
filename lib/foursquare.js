
/**
 * Module dependencies.
 */

var Foursquare = require('node-foursquare-venues');

/**
 * Foursquare credentials
 */

var CLIENT_ID = process.env.FOURSQUARE_CLIENT_ID;
var CLIENT_SECRET = process.env.FOURSQUARE_CLIENT_SECRET;

/**
 * Expose `Foursquare` client.
 */

module.exports = Foursquare(CLIENT_ID, CLIENT_SECRET);
