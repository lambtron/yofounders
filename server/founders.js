
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
  var load = {
    v: '20141122',
    ll: lat + ',' + lng,
    categoryId: '4bf58dd8d48988d124941735',
    radius: 15,
    intent: 'browse'
  };
  var search = thunkify(Foursquare.venues.search);
  var results = yield search(load);
  var venues = results.response.venues;

  // console.log(venues);

  venues.map(function(venue) {
    console.log(venue.name);
  });

  // console.log(JSON.stringify(venues, null, 2));

  // var link = yield Pastebin.new({ title: 'test', content: 'content' });
  var link = '';
  return link;
};

/**
 * Expose `Founders`
 */

module.exports = Founders;
