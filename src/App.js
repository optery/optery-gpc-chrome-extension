/* global chrome */
import { useEffect, useState } from "react";
import Popup from "./components/Popup";

const App = () => {
  const [gpcEnabled, setGpcEnabled] = useState(false);

  useEffect(() => {
    const updateGpcStatus = () => {
      chrome.storage.sync.get("gpcValue", (result) => {
        const gpcValue = !!result.gpcValue;
        setGpcEnabled(gpcValue);
      });
    };

    updateGpcStatus();

    chrome.storage.onChanged.addListener(updateGpcStatus);

    // Cleanup listener on component unmount
    return () => {
      chrome.storage.onChanged.removeListener(updateGpcStatus);
    };
  }, []);

  // Function to handle the change of GPC status
  const handleGpcChange = () => {
    const isChecked = !gpcEnabled;
    setGpcEnabled(isChecked);
    chrome.storage.sync.set({ gpcValue: isChecked }, () => {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const tab = tabs[0];
        const isChromeInternalPage = tab.url.startsWith("chrome://");

        if (isChromeInternalPage) {
          console.warn("Cannot send message to Chrome internal pages.");
          return;
        }
        chrome.tabs.sendMessage(tab.id, { gpcValue: isChecked });
      });
    });
  };

  return (
    <>
      <Popup handleGpcChange={handleGpcChange} gpcEnabled={gpcEnabled} />
    </>
  );
};

export default App;
