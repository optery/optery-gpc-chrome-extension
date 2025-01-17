/* global browser */
import { useEffect, useState } from "react";
import Popup from "./components/Popup";
import Modal from "./components/Modal";
const App = () => {
  const [gpcEnabled, setGpcEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const updateGpcStatus = () => {
      browser.storage.sync.get("gpcValue", (result) => {
        const gpcValue = !!result.gpcValue;
        setGpcEnabled(gpcValue);
      });
    };

    updateGpcStatus();

    browser.storage.onChanged.addListener(updateGpcStatus);

    // Cleanup listener on component unmount
    return () => {
      browser.storage.onChanged.removeListener(updateGpcStatus);
    };
  }, []);

  // Function to handle the change of GPC status
  const handleGpcChange = () => {
    const isChecked = !gpcEnabled;
    setGpcEnabled(isChecked);
    browser.storage.sync.set({ gpcValue: isChecked }, () => {
      browser.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const tab = tabs[0];

        if (tab && !tab.url.startsWith("about:")) {
          return;
        }
        browser.tabs.sendMessage(tab.id, { gpcValue: isChecked });
      });
      setShowModal(true);
    });
  };

  const handleModalSelect = (option) => {
    setShowModal(false);
    if (option === "current") {
      browser.tabs.query(
        { active: true, currentWindow: true },
        function (tabs) {
          if (tabs.length > 0) {
            browser.tabs.reload(tabs[0].id);
          }
        }
      );
    } else if (option === "all") {
      browser.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
          browser.tabs.reload(tab.id);
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
