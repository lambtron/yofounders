
/**
 * Module dependencies.
 */

var Crunchbase = require('../lib/crunchbase');
var Foursquare = require('../lib/foursquare');
var Pastebin = require('../lib/pastebin');
var thunkify = require('thunkify-wrap');
var urlencode = require('urlencode');

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
  var companies = [];
  for (var i = 0; i < venues.length; i++) {
    var company = yield Crunchbase.organization(venues[i].name);
    if (company.data.uuid && !company.data.properties.is_closed)
      companies.push(company.data);
  }
  return 'localhost:3000/founders/' + buildQueryString(companies);
};

/**
 * Expose `Founders`
 */

module.exports = Founders;

/**
 * Private function to build query string.
 *
 * @param {Object} company
 */

function buildQueryString(companies) {
  var qs = '?';
  for (var i = 0; i < companies.length; i++) {
    var company = companies[i];
    var founders = company.relationships.founders.items.map(function(founder) {
      var domain = getDomain(company.properties.homepage_url);
      var email = founder.name.split(' ')[0] + '@'
        + domain.substring(domain.indexOf('www') + 4);
      return JSON.stringify({ name: founder.name, email: email });
    });
    founders = founders.join(',');
    var qsObj = {
      name: urlencode(company.properties.name),
      description: urlencode(company.properties.short_description),
      website: urlencode(getDomain(company.properties.homepage_url)),
      founders: urlencode(founders),
      logo: urlencode('http://www.crunchbase.com/organization/'
        + company.properties.permalink + '/primary-image/raw')
    };
    for (var prop in qsObj) {
      qs += prop + i + '=' + qsObj[prop] + '&';
    }
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
