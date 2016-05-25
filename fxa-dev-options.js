
module.exports = {
  'browser.shell.checkDefaultBrowser': false,
  'general.warnOnAboutConfig': false,
  'identity.fxaccounts.auth.uri': 'https://%(remoteUrl)s.dev.lcip.org/auth/v1',
  'identity.fxaccounts.remote.force_auth.uri': 'https://%(remoteUrl)s.dev.lcip.org/force_auth?service=sync&context=fx_desktop_v3',
  'identity.fxaccounts.remote.oauth.uri': 'https://%(remoteUrl)s.dev.lcip.org/oauth/v1',
  'identity.fxaccounts.remote.profile.uri': 'https://%(remoteUrl)s.dev.lcip.org/profile/v1',
  'identity.fxaccounts.remote.signin.uri': 'https://%(remoteUrl)s.dev.lcip.org/signin?service=sync&context=fx_desktop_v3',
  'identity.fxaccounts.remote.signup.uri': 'https://%(remoteUrl)s.dev.lcip.org/signup?service=sync&context=fx_desktop_v3',
  'identity.fxaccounts.remote.webchannel.uri': 'https://%(remoteUrl)s.dev.lcip.org/',
  'identity.fxaccounts.settings.uri': 'https://%(remoteUrl)s.dev.lcip.org/settings?service=sync&context=fx_desktop_v3',
  'services.sync.log.appender.file.logOnSuccess': true,
  'identity.sync.tokenserver.uri': 'https://%(remoteUrl)s.dev.lcip.org/syncserver/token/1.0/sync/1.5'
};

