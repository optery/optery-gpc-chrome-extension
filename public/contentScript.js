const checkInitialGPC = () => {
  const initialGPCValue = navigator.globalPrivacyControl;
  chrome.runtime.sendMessage({
    action: "initialGPCValue",
    value: initialGPCValue,
  });
};

// Function to inject injectScript.js with the given gpcValue
const injectScriptWithGPCValue = (gpcValue) => {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("injectScript.js");
  script.onload = () => {
    script.remove();
    // Dispatch a custom event with the gpcValue
    const event = new CustomEvent("GPCValue", { detail: gpcValue });
    document.dispatchEvent(event);
  };
  (document.head || document.documentElement).appendChild(script);
};

const updateRulesetState = (enabled) => {
  chrome.runtime.sendMessage({ action: "updateRulesetState", enable: enabled });
};

// Request gpcValue from the background script
chrome.runtime.sendMessage({ action: "getGPCValue" }, (response) => {
  const gpcValue = response.gpcValue;
  updateRulesetState(gpcValue);
  // Inject the injectScript.js script into the webpage with the gpcValue
  injectScriptWithGPCValue(gpcValue);
});

// Listen for message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.gpcValue !== undefined) {
    const gpcValue = message.gpcValue;
    updateRulesetState(gpcValue);
    // Inject the injectScript.js script into the webpage with the gpcValue
    injectScriptWithGPCValue(gpcValue);
    sendResponse({ success: true });
    return true;
  }
});

checkInitialGPC();
