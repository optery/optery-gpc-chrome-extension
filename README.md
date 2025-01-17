# Optery Global Privacy Control (GPC) Extension - Deliver Privacy Preferences

## Installation

To install and run the Optery Global Privacy Control (GPC) Extension locally, follow these steps:

1. Clone this repository:

   ```bash
   git clone git@github.com:optery/optery-gpc-chrome-extension.git
   ```

2. Navigate to project directory:

   ```bash
   cd optery-gpc-chrome-extension
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Build Instructions

### For Chrome Extension

1. Build the Chrome extension:

   ```bash
   npm run build:chrome
   ```

   This will create a build folder in the `chrome` directory.

2. Load in Chrome:
   - Open Google Chrome and go to `chrome://extensions`
   - Enable "Developer mode" toggle switch
   - Click "Load unpacked" and select the `chrome/build` folder
   - The extension should now be loaded in Chrome

### For Firefox Extension

1. Build the Firefox extension:

   ```bash
   npm run build:firefox
   ```

   This will create a build folder in the `firefox` directory.

2. Load in Firefox:
   - Open Firefox and go to `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Navigate to the `firefox/build` folder and select the manifest.json file
   - The extension should now be loaded in Firefox

### Build Both Extensions

To build both Chrome and Firefox extensions simultaneously:

```bash
npm run build
```

## Install from Stores

### Chrome Web Store

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/chrome/chrome.svg" width="48" alt="Chrome" valign="middle">][link-chrome] [<img valign="middle" src="https://img.shields.io/github/v/release/optery/optery-gpc-chrome-extension">][link-chrome] and other Chromium browsers

[link-chrome]: https://chromewebstore.google.com/detail/optery-global-privacy-con/nkiidnpgmddigajgebjhcdiklebfoomm?utm_source=gpc_extension&utm_medium=chrome_webstore&utm_campaign=gpc_extension_github

Firefox Add-ons Store link coming soon.

## Project Structure

```
optery-gpc-chrome-extension/
├── chrome/           # Chrome extension workspace
├── firefox/          # Firefox extension workspace
├── package.json      # Root package.json with workspaces config
└── README.md
```

Each browser-specific workspace contains its own:

- Source code
- Build configuration
- Manifest file
- Dependencies
