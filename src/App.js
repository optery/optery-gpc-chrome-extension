/* global chrome */
import { useEffect, useState } from "react";
import Popup from "./components/Popup";
import Modal from "./components/Modal";
const App = () => {
  const [gpcEnabled, setGpcEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      setShowModal(true);
    });
  };

  const handleModalSelect = (option) => {
    setShowModal(false);
    if (option === "current") {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    } else if (option === "all") {
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
          chrome.tabs.reload(tab.id);
        });
      });
    }
  };

  return (
    <>
      <Popup handleGpcChange={handleGpcChange} gpcEnabled={gpcEnabled} />
      <Modal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSelect={handleModalSelect}
        gpcEnabled={gpcEnabled}
      />
    </>
  );
};

export default App;
