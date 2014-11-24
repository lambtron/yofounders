
/**
 * Module dependencies.
 */

var Crunchbase = require('../lib/crunchbase');
var Foursquare = require('../lib/foursquare');
var Distance = require('../lib/distance');
var thunkify = require('thunkify-wrap');
var urlencode = require('urlencode');
var Bitly = require('../lib/bitly');

/**
 * Define `Founders`.
 */

var Founders = {};

/**
 * Get information about the founders.
 *
 * Return a Bitly link to send back to end user.
 */

Founders.get = function *get(lat, lng) {
  var load = {
    v: '20141122',
    ll: lat + ',' + lng,
    categoryId: '4bf58dd8d48988d124941735',
    radius: 20,
    intent: 'browse'
  };
  var search = thunkify(Foursquare.venues.search);
  var results = yield search(load);
  var venues = results.response.venues;
  var companies = [];
  for (var i = 0; i < venues.length; i++) {
    var company = yield Crunchbase.organization(venues[i].name);
    if (company.data.uuid && !company.data.properties.is_closed) {
      var origin = [lat + ',' + lng];
      var destination = [venues[i].location.lat + ',' + venues[i].location.lng];
      var distance = yield Distance.matrix(origin, destination);
      company.data.location = {};
      if (distance.status === 'OK')
        company.data.location.distance = distance.rows[0].elements[0].distance.text;
      company.data.location.address = venues[i].location.address;
      companies.push(company.data);
    }
  }
  var link = 'http://yofounders.herokuapp.com/founders/'
             + buildQueryString(companies);
  return yield Bitly.shortenLink(link);
};

/**
 * Expose `Founders`
 */

module.exports = Founders;

/**
 * Private function to build query string.
 *
 * @param {Object} companies
 */

function buildQueryString(companies) {
  var qs = '?';
  for (var i = 0; i < companies.length; i++) {
    var c = '';
    var company = companies[i];
    if (!company.relationships.founders) continue;
    if (!company.properties.homepage_url
      || company.properties.homepage_url.length === 0) continue;
    var founders = company.relationships.founders.items.map(function(founder) {
      var domain = getDomain(company.properties.homepage_url);
      var s = 0;
      if (~domain.indexOf('www')) s = domain.indexOf('www') + 4;
      var email = founder.name.split(' ')[0] + '@' + domain.substring(s);
      return JSON.stringify({ name: founder.name, email: email });
    });
    founders = founders.join(',');
    var qsObj = {
      name: urlencode(company.properties.name),
      description: urlencode(company.properties.short_description),
      website: urlencode(getDomain(company.properties.homepage_url)),
      founders: urlencode(founders),
      logo: urlencode('http://www.crunchbase.com/organization/'
        + company.properties.permalink + '/primary-image/raw'),
      distance: urlencode(company.location.distance),
      address: urlencode(company.location.address)
    };
    for (var prop in qsObj) {
      c += prop + i + '=' + qsObj[prop] + '&';
    }
    if (qs.length + c.length > 2000) break;
    qs += c;
  }
  qs = qs.slice(0, -1);
  return qs;
}

/**
 * Private function to remove http and trailing '/' from url.
 *
 * @param {String} url
 *
 * @return {String}
 */

function getDomain(url) {
  var host = url.replace('http://', '');
  host = host.replace('https://', '');
  if (host.charAt(host.length - 1) === '/') host = host.slice(0, -1);
  return host;
}
