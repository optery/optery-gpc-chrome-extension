// Listener for updates
browser.runtime.onUpdateAvailable.addListener(function (details) {
  browser.runtime.reload();
});

// Function to check for updates
function checkForUpdate() {
  browser.storage.local.get("lastKnownVersion", (data) => {
    let currentVersion = browser.runtime.getManifest().version;
    let lastKnownVersion = data.lastKnownVersion;

    if (!lastKnownVersion) {
      browser.storage.local.set({ lastKnownVersion: currentVersion });
    } else if (currentVersion !== lastKnownVersion) {
      browser.storage.local.set({ lastKnownVersion: currentVersion }, () => {
        browser.runtime.reload();
      });
    }
  });
}

// Version check on startup
browser.runtime.onStartup.addListener(() => {
  checkForUpdate();
});

// Check for update when the extension is installed
browser.runtime.onInstalled.addListener((details) => {
  checkForUpdate();
});

const setupWebRequestRules = (enable) => {
  if (enable) {
    browser.webRequest.onBeforeSendHeaders.addListener(
      (details) => {
        let headers = details.requestHeaders || [];
        headers.push({ name: "Sec-GPC", value: "1" });
        return { requestHeaders: headers };
      },
      { urls: ["<all_urls>"] },
      ["blocking", "requestHeaders"]
    );
  }
};

browser.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "initialGPCValue") {
    return browser.storage.sync.get("gpcValue").then((result) => {
      if (result.gpcValue === undefined) {
        return browser.storage.sync.set({ gpcValue: message.value });
      }
    });
  } else if (message.action === "updateRulesetState") {
    setupWebRequestRules(message.enable);
    return Promise.resolve({ success: true });
  } else if (message.action === "getGPCValue") {
    return browser.storage.sync.get("gpcValue").then((result) => ({
      gpcValue: result.gpcValue,
    }));
  }
});
