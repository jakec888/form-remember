# Form Automation Firefox/Chrome Extension

automate autofill text inputs on specific pages

# Instillation

Firefox([https://addons.mozilla.org/en-US/firefox/addon/form-automation-extension/](https://addons.mozilla.org/en-US/firefox/addon/form-automation-extension/))

# Walk-Throughs

### <center>Fill Form Text Inputs Once</center>

<p align="center">
<img src="walk-through-1.gif" />
</p>

### <center>Auto-Fill Similar Forms</center>

<p align="center">
<img src="walk-through-2.gif" />
</p>

### <center>Export Your Data</center>

##### <center>_your own data is stored locally_</center>

##### <center>_your data is not shared or stored externally_</center>

<p align="center">
<img src="walk-through-3.gif" />
</p>

# Instillation (Development)

```
git clone https://github.com/jakec888/form-automation-extension.git
cd form-automation-extension
nvm use v11
npm install
```

be sure to use node version 11

# Todo

- [x] create hashmap to insert input tag names with the text value
- [x] add keyboard shortcut
- [x] material ui
- [ ] import hashmap as a json file (in progress)
  - [ ] browser API not passing messages from webpage/tab to background
- [x] export hashmap into json file
- [ ] publish
  - [x] firefox (in review)
  - [ ] chrome
- [ ] refactor
