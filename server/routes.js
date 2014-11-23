
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
 * Show founders.
 */

Routes.showFounders = function *showFounders() {
  var founders = [];
  var query = this.request.query;
  for (var prop in query) {
    var i = prop.charAt(prop.length - 1);
    var p = prop.slice(0, -1);
    var founder = founders[i];
    if (!founder)
      var founder = {};
    founder[p] = query[prop];
    founders[i] = founder;
    if (~p.indexOf('founder')) {
      var f = query[prop].split('},');
      founder[p] = f.map(function(e) {
        if (!~e.indexOf('}')) e += '}';
        return JSON.parse(e);
      });
    }
  }

  console.log(founders);

  this.body = yield render('founders', { founders: founders });
};

/**
 * Expose `Routes`.
 */

module.exports = Routes;
