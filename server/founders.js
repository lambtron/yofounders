
/**
 * Module dependencies.
 */

var Crunchbase = require('../lib/crunchbase');
var Foursquare = require('../lib/foursquare');
var Pastebin = require('../lib/pastebin');
var thunkify = require('thunkify-wrap');

/**
 * Define `Founders`.
 */

var Founders = {};

/**
 * Get information about the founders.
 *
 * Return a pastebin URL to send back to end user.
 */

Founders.get = function *get(lat, lng) {
  console.log('hi');
  var load = {
    v: '20141122',
    ll: lat + ',' + lng,
    query: 'startup',
    radius: 400,
    intent: 'checkin'
  };
  var search = thunkify(Foursquare.venues.search);
  var results = yield search(load);
  var venues = results.response.venues;

  console.log(venues);

  // var link = yield Pastebin.new({ title: 'test', content: 'content' });
  return link;
};

/**
 * Expose `Founders`
 */

module.exports = Founders;
