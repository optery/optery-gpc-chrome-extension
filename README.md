# Optery Global Privacy Control (GPC) Extension

A Chrome Extension Manifest V3 app that lets users signal their privacy
preference through the Global Privacy Control standard. The extension toggles the
GPC signal for the current browser session, updates the active tab, and refreshes
browser state when the user changes protection settings.

Chrome Web Store: https://chromewebstore.google.com/detail/optery-global-privacy-con/nkiidnpgmddigajgebjhcdiklebfoomm?utm_source=gpc_extension&utm_medium=chrome_webstore&utm_campaign=gpc_extension_github

## Tech Stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 + Vite 7 |
| Language | JavaScript / JSX |
| Styling | Tailwind CSS v4 |
| Extension model | Chrome Extension MV3 |
| Browser APIs | `chrome.storage`, `chrome.tabs`, `chrome.declarativeNetRequest` |
| UI behavior | Popup modal + injected content script |
| Tests | None in repo |

## Getting Started

Requires Node and npm.

```bash
npm install
```

### Clone the Repository

```bash
git clone git@github.com:optery/optery-gpc-chrome-extension.git
cd optery-gpc-chrome-extension
```

### Run / Build

```bash
npm run dev      # Vite dev server
npm run build    # production extension bundle
npm run preview  # local preview of the built app
npm run lint     # ESLint
```

### Run Locally

To run the extension locally, build it first and then load the generated folder
into Chrome.

```bash
npm run build
```

Then:

1. Open Google Chrome and go to `chrome://extensions`.
2. Enable Developer mode.
3. Click **Load unpacked**.
4. Select the generated `build/` folder.

For the localhost-enabled development flow and its security caveats, see
[LOCALHOST_SETUP.md](./LOCALHOST_SETUP.md).

### Load in Chrome

1. Run `npm run build`.
2. Open `chrome://extensions`.
3. Enable Developer mode.
4. Click **Load unpacked**.
5. Select the generated extension bundle.

The repository README already links to the Chrome Web Store release. Use the
packaged store build for normal installs, and load unpacked only for local
validation.

## What the Extension Does

The extension presents a popup UI with an on/off privacy shield. When the user
changes the GPC state, it:

- stores the preference in `chrome.storage.sync`
- updates the active tab with the new GPC state
- enables or disables the declarative net request ruleset
- shows a modal asking whether to refresh the current tab or all tabs

The main UI lives in:

- [src/components/Popup.jsx](src/components/Popup.jsx)
- [src/components/Modal.jsx](src/components/Modal.jsx)
- [src/App.jsx](src/App.jsx)

## Architecture

```
src/
  main.jsx              React entry point
  App.jsx               popup state and refresh modal wiring
  components/           popup and modal UI
  index.css             global styles
public/
  manifest.json         Chrome extension manifest
  background.js         service worker / message router
  contentScript.js      reads and applies the current GPC state
  injectScript.js       injects the GPC signal into the page
  rules.json            declarative net request ruleset
  icons/                extension icons and branding assets
build/                  generated extension bundle
```

## Permissions and Manifest

The extension requests only the permissions needed for its GPC workflow:

- `storage`
- `tabs`
- `declarativeNetRequest`

It also declares host permissions for all URLs so it can inject and enforce the
GPC signal across websites.

## GPC Flow

The runtime flow is split between the popup, content script, and background
service worker:

- [public/contentScript.js](public/contentScript.js) reads the current
  `navigator.globalPrivacyControl` value and synchronizes the ruleset state.
- [public/background.js](public/background.js) persists the chosen preference
  and handles ruleset enable/disable requests.
- [public/injectScript.js](public/injectScript.js) injects the page-level GPC
  signal.

The extension starts with the browser’s current GPC value, then keeps the stored
preference and the ruleset aligned as the user toggles the shield.

## Project Notes

- The popup includes a refresh confirmation modal so users can apply the change
  to the current tab or all tabs.
- `build/` is generated output and should not be edited by hand.
- The current release version is declared in both `package.json` and
  `public/manifest.json`.

## Related Docs

- [Chrome Web Store listing](https://chromewebstore.google.com/detail/optery-global-privacy-con/nkiidnpgmddigajgebjhcdiklebfoomm?utm_source=gpc_extension&utm_medium=chrome_webstore&utm_campaign=gpc_extension_github)
