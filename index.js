/**
 foxfire - Firefox launcher main module
 @module
 */
var debug = require('debug')('index');
var launchFirefox = require('./lib/launch-firefox');
var profileCreator = require('./lib/profile-creator');
var Promise = require('bluebird');
var userJsContents = require('./lib/user-js-contents');

/**
 * Launch Firefox.
 * @param {Object} options - launcher options
 * @param {Object} options.profileOptions - Firefox profile options
 * @param {Object} options.createProfile - Creates a permanent profile on disk
 * @param {Array} options.args - Firefox arguments, see developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options
 *
 * @example
 * // starts Firefox with debugger open and browser chrome devtools enabled.
 * var foxfire = require('foxfire')
 * foxfire({
 *  args: [ '-jsdebugger'],
 *  profileOptions: {  'devtools.chrome.enabled': true }
 * });
 *
 * @example
 * // CLI Usage
 * foxfire
 *
 * @example
 * // CLI Usage with custom Firefox executable
 * FIREFOX_BIN=/Applications/FirefoxNightly.app/Contents/MacOS/firefox-bin foxfire
 */
module.exports = function (options) {
  options = options || {};
  debug('options', options);

  var prefs = userJsContents(options.profileOptions);
  debug('user.js', prefs);

  var firefoxBinary = options.firefoxBinary || process.env.FIREFOX_BIN || require('firefox-location');
  var profileName = options.profileName || process.env.PROFILE_NAME;
  var createProfile = options.createProfile || process.env.CREATE_PROFILE || profileName;

  Promise.resolve(createProfile && profileCreator(firefoxBinary, prefs, profileName))
    .then(function (profileInfo) {
      if (profileInfo) {
        console.log('Profile named', profileInfo.profileName, 'stored at', profileInfo.profileLocation);
        return profileInfo.profileLocation;
      }
    })
    .then(function (profileLocation) {
      // if profileLocation is not specified, a temporary profile is created with `prefs`
      var args = options.args || [];

      return launchFirefox(firefoxBinary, args, {
        profileLocation: profileLocation,
        prefs: prefs
      });
    })
    .then(function (code) {
      console.log('Firefox closed. Code:', code);

      process.exit(code);
    });
};
