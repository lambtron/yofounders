
/**
 * Module dependencies.
 */

var BitlyAPI = require('node-bitlyapi');
var thunkify = require('thunkify-wrap');

/**
 * Bitly credentials
 */

var config = {
  client_id: process.env.BITLY_CLIENT_ID,
  client_secret: process.env.BITLY_CLIENT_SECRET
};
var access_token = process.env.BITLY_ACCESS_TOKEN;
var Bitly = new BitlyAPI(config);

Bitly.setAccessToken(access_token);

/**
 * Expose thunkified `Bitly` client.
 */

module.exports = thunkify(Bitly);
