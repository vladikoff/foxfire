var crypto = require('crypto');
var debug = require('debug')('index');
var fs = require('fs');
var Promise = require('bluebird');
var spawn = require('cross-spawn-async');

var paths = require('./paths');

var DEFAULT_PROFILE_OPTIONS = {
  'browser.shell.checkDefaultBrowser': false
};

var BINARY = paths.detectBinary();
var ARGS = [];
var SPAWN_OPTIONS = {
  stdio: 'inherit'
};

module.exports = function (options) {
  options = options || {};
  debug('options', options)

  var userJsContents = ''
  Object.keys(DEFAULT_PROFILE_OPTIONS).forEach(function (option) {
    userJsContents += 'user_pref("' + option + '", ' + false + ');\n';
  });
  if (options.profileOptions) {
    // user.js contents


    Object.keys(options.profileOptions).forEach(function (option) {
      var prefVal = options.profileOptions[option]
      if (prefVal === false) {
        userJsContents += 'user_pref("' + option + '", ' + false + ');\n';
      } else if (prefVal === true) {
        userJsContents += 'user_pref("' + option + '", ' + true + ');\n';
      } else {
        userJsContents += 'user_pref("' + option + '", "' + options.profileOptions[option] + '");\n';
      }
    });
  }

  debug('user.js', userJsContents)

  if (options.args) {
    ARGS += options.args
  }

  return new Promise(function (resolve, reject) {
    var profileName = crypto.randomBytes(14).toString('hex');
    var child = spawn(BINARY, ['-CreateProfile', profileName], {});

    // collect output from -CreateProfile
    var out = '';
    child.stderr.on('data', function (data) {
      out += data
    });

    child.on('close', function (code) {
      // extract profileLocation
      var profileLocation = out.trim().substring(out.indexOf('at \'') + 4, out.length - 10)
      return resolve({
        profileName: profileName,
        profileLocation: profileLocation
      })
    });
  }).then(function (profileDetails) {
    debug('profileDetails', profileDetails)
    fs.writeFileSync(profileDetails.profileLocation + 'user.js', userJsContents)

    var child = spawn(BINARY, ['-p', profileDetails.profileName, '-foreground'].concat(ARGS), SPAWN_OPTIONS);
    child.on('close', function (code) {
      console.log('Firefox closed. Code:', code);
    });
  })
};
