/**
 foxfire - Firefox launcher main module
 @module
 */
var crypto = require('crypto');
var debug = require('debug')('index');
var fs = require('fs');
var fxaDevOptions = require('./fxa-dev-options');
var Promise = require('bluebird');
var spawn = require('cross-spawn-async');
var dateFormat = require('dateformat');

var paths = require('./paths');

var DEFAULT_PROFILE_OPTIONS = {
  'browser.shell.checkDefaultBrowser': false
};

var BINARY = paths.detectBinary();
var ARGS = [];
var SPAWN_OPTIONS = {
  stdio: 'inherit'
};

/**
 * Launch Firefox.
 * @param {Object} options - launcher options
 * @param {Object} options.profileOptions - Firefox profile options
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

  var userJsContents = '';

  function getPrefString(prefName, prefVal) {
    return 'user_pref("' + prefName + '", ' + JSON.stringify(prefVal) + ');\n';
  }

  if (options.remoteUrl) {
    Object.keys(fxaDevOptions).forEach(function (prefName) {
      var prefVal = fxaDevOptions[prefName];

      if (typeof prefVal === 'string') {
        prefVal = prefVal.replace('%(remoteUrl)s', options.remoteUrl);
      }

      userJsContents += getPrefString(prefName, prefVal);
    });
  } else {
    Object.keys(DEFAULT_PROFILE_OPTIONS).forEach(function (prefName) {
      var prefVal = DEFAULT_PROFILE_OPTIONSF[prefName];
      userJsContents += getPrefString(prefName, prefVal);
    });
  }


  if (options.profileOptions) {
    // user.js contents
    Object.keys(options.profileOptions).forEach(function (prefName) {
      var prefVal = options.profileOptions[option];
      userJsContents += getPrefString(prefName, prefVal);
    });
  }

  debug('user.js', userJsContents);

  if (options.args) {
    ARGS += options.args;
  }

  return new Promise(function (resolve, reject) {
    var profileName = 'ffire' + dateFormat("dd.mm.yy-h.MM.ss");
    var child = spawn(BINARY, ['-CreateProfile', profileName], {});

    // collect output from -CreateProfile
    var out = '';
    child.stderr.on('data', function (data) {
      out += data;
    });

    child.on('close', function (code) {
      // extract profileLocation
      var profileLocation = out.trim().substring(out.indexOf('at \'') + 4, out.length - 10);
      return resolve({
        profileName: profileName,
        profileLocation: profileLocation
      });
    });
  }).then(function (profileDetails) {
    debug('profileDetails', profileDetails);
    fs.writeFileSync(profileDetails.profileLocation + 'user.js', userJsContents);

    var child = spawn(BINARY, ['-p', profileDetails.profileName, '-foreground'].concat(ARGS), SPAWN_OPTIONS);
    child.on('close', function (code) {
      console.log('Firefox closed. Code:', code);
    });
  });
};
