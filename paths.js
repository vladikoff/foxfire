var platform = process.platform;
var customBinary = process.env.FIREFOX_BIN

module.exports = {
  detectBinary: function () {
    // if we get FIREFOX_BIN
    if (customBinary) {
      return customBinary;
    }

    var binary = 'firefox';

    // detect paths based on os
    if (platform === 'darwin') {
     binary = '/Applications/Firefox.app/Contents/MacOS/firefox-bin';
    }

    return binary;
  }
}
