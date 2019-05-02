<a name="module_index"></a>

## index
foxfire - Firefox launcher main module

<a name="exp_module_index--module.exports"></a>

### module.exports(options) ⏏
Launch Firefox.

**Kind**: Exported function

| Param | Type | Description | Environment variable |
| --- | --- | --- | --- |
| options | <code>Object</code> | launcher options |
| options.createProfile | <code>Boolean</code> | Whether to create the profile. Profile is automatically created if `profileName` is specified. | `CREATE_PROFILE` |
| options.firefoxBinary | <code>String</code> | Path to firefox binary. | `FIREFOX_BIN` |
| options.profileName | <code>String</code> | Name of created Firefox profile | `PROFILE_NAME` |
| options.profileOptions | <code>Object</code> | Firefox profile options |
| options.args |<code>Array</code> | Firefox arguments, see developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options |

**Example**
```js
// starts Firefox with debugger open and browser chrome devtools enabled.
var foxfire = require('foxfire')
foxfire({
 args: [ '-jsdebugger'],
 profileOptions: {  'devtools.chrome.enabled': true }
});
```
**Example**
```js
// CLI Usage
foxfire
```
**Example**
```js
// CLI Usage with custom Firefox executable
FIREFOX_BIN=/Applications/FirefoxNightly.app/Contents/MacOS/firefox-bin foxfire
```
