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
