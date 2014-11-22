
/**
 * Module dependencies.
 */

var parse = require('co-body');
var render = require('../lib/render');

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
  // username and location
};

/**
 * Expose `Routes`.
 */

module.exports = Routes;
