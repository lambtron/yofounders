
/**
 * Module dependencies.
 */

var parse = require('co-body');
var render = require('../lib/render');
var Founders = require('./founders');
var Yo = require('../lib/yo');

/**
 * Define `Routes`.
 */

var Routes = {};

/**
 * Render index html page.
 */

Routes.index = function *index() {
  this.body = yield render('index');
};

/**
 * Get `yo`.
 */

Routes.getYo = function *getYo() {
  var username = this.request.query.username;
  var location = this.request.query.location;
  var lat = location.substring(0, location.indexOf(';'));
  var lng = location.substring(location.indexOf(';') + 1);
  var link = yield Founders.get(lat, lng);
  Yo.yo_link(username, link);
};

/**
 * Expose `Routes`.
 */

module.exports = Routes;
