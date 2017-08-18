/**
 Use `firefoxBinary` to create a firefoxProfile named `profileName` with `prefs`.
 `profileName` is optional, if not specified, a profile name based
 on the date will be used.
 @module profile-creator
 */

var dateFormat = require('dateformat');
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var spawn = require('cross-spawn-async');

module.exports = function (firefoxBinary, prefs, profileName) {
  return new Promise(function (resolve, reject) {
    profileName = profileName || 'ffire' + dateFormat("dd.mm.yy-h.MM.ss");

    var child = spawn(firefoxBinary, ['-CreateProfile', profileName], {});

    // collect output from -CreateProfile
    var out = '';
    child.stderr.on('data', function (data) {
      out += data
    });

    child.on('close', function (code) {
      // extract profileLocation
      var profileLocation = out.trim().substring(out.indexOf('at \'') + 4, out.length - 10);
      fs.writeFileSync(path.join(profileLocation, 'user.js'), prefs);

      return resolve({
        profileName: profileName,
        profileLocation: profileLocation
      })
    });
  });
};
