/**
 Launch `firefoxBinary` with `args`, using the profile at `profileLocation`
 with `userJsContents`.

 @module profile-creator
 */


var launchFirefox = require('firefox-launch');

module.exports = function (firefoxBinary, args, opts) {
  return new Promise(function (resolve, reject) {
    var child = launchFirefox('', {
      args: args,
      dir: opts.profileLocation,
      firefoxBinary: firefoxBinary,
      pref: ! opts.profileLocation && opts.prefs
    });

    child.on('close', resolve);
  });
};
