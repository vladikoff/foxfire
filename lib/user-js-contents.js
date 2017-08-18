module.exports = function (profileOptions) {
  var DEFAULT_PROFILE_OPTIONS = {
    'browser.shell.checkDefaultBrowser': false
  };

  var profileContents = '';
  Object.keys(DEFAULT_PROFILE_OPTIONS).forEach(function (option) {
    profileContents += 'user_pref("' + option + '", ' + false + ');\n';
  });

  if (profileOptions) {
    // user.js contents
    Object.keys(profileOptions).forEach(function (option) {
      var prefVal = profileOptions[option];
      if (prefVal === false) {
        profileContents += 'user_pref("' + option + '", ' + false + ');\n';
      } else if (prefVal === true) {
        profileContents += 'user_pref("' + option + '", ' + true + ');\n';
      } else {
        profileContents += 'user_pref("' + option + '", "' + profileOptions[option] + '");\n';
      }
    });
  }

  return profileContents;
};
