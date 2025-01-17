// Listener for updates
chrome.runtime.onUpdateAvailable.addListener(function (details) {
  chrome.runtime.reload();
});

// Function to check for updates
function checkForUpdate() {
  chrome.storage.local.get("lastKnownVersion", (data) => {
    let currentVersion = chrome.runtime.getManifest().version;
    let lastKnownVersion = data.lastKnownVersion;

    if (!lastKnownVersion) {
      chrome.storage.local.set({ lastKnownVersion: currentVersion });
    } else if (currentVersion !== lastKnownVersion) {
      chrome.storage.local.set({ lastKnownVersion: currentVersion }, () => {
        chrome.runtime.reload();
      });
    }
  });
}

// Version check on startup
chrome.runtime.onStartup.addListener(() => {
  checkForUpdate();
});

// Check for update when the extension is installed
chrome.runtime.onInstalled.addListener((details) => {
  checkForUpdate();
});

// Listen for message from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "initialGPCValue") {
    chrome.storage.sync.get("gpcValue", (result) => {
      if (result.gpcValue === undefined) {
        chrome.storage.sync.set({ gpcValue: message.value });
      }
    });
    return true;
  } else if (message.action === "updateRulesetState") {
    const { enable } = message;
    chrome.declarativeNetRequest.updateEnabledRulesets(
      {
        enableRulesetIds: enable ? ["ruleset_1"] : [],
        disableRulesetIds: enable ? [] : ["ruleset_1"],
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error(
            "Failed to update ruleset state:",
            chrome.runtime.lastError
          );
        }
        sendResponse({ success: !chrome.runtime.lastError });
      }
    );
    return true;
  } else if (message.action === "getGPCValue") {
    chrome.storage.sync.get("gpcValue", (result) => {
      const gpcValue = result.gpcValue;
      sendResponse({ gpcValue });
    });
    return true;
  }
});
