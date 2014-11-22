
/**
 * Module dependencies.
 */

var parse = require('co-body');
var render = require('../lib/render');
var Founders = require('./founders');

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
  // parse request to get username and location
  // var link = yield Founders.get();
  // send POST to YO endpoint
};

/**
 * Expose `Routes`.
 */

module.exports = Routes;
