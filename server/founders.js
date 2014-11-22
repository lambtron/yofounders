
/**
 * Module dependencies.
 */

var Crunchbase = require('../lib/crunchbase');
var Pastebin = require('../lib/pastebin');

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
  var link = yield Pastebin.new({ title: 'test', content: 'content' });
  return link;
};

/**
 * Expose `Founders`
 */

module.exports = Founders;
