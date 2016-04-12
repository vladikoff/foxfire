<a name="module_index"></a>

## index
foxfire - Firefox launcher main module

<a name="exp_module_index--module.exports"></a>

### module.exports(options) ⏏
Launch Firefox.

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | launcher options |
| options.profileOptions | <code>Object</code> | Firefox profile options |
| options.args | <code>Array</code> | Firefox arguments, see developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options |

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
