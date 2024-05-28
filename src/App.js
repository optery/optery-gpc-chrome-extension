/* global chrome */
import { useEffect, useState } from "react";

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
      <div className={"flex justify-center items-center bg-[#FFFFFF] h-full"}>
        <div className={`p-5 bg-[#011E3B] w-[457px] h-[657px] flex flex-col`}>
          <div className={"flex flex-col gap-8"}>
            <div className={"flex gap-2 justify-center items-center"}>
              <img src={"/icons/optery.svg"} alt="Optery" />
              <div
                  className={
                    "bg-[#B5F8F1] text-[#011E3B] text-center text-xs not-italic font-semibold uppercase rounded-[19.567px] py-2.5 px-3.5"
                  }
              >
                extension
              </div>
            </div>
            <div>
              <div className={"flex flex-col justify-center items-center gap-4"}>
              <span className={"font-semibold text-xl text-[#B5F8F1]"}>
                Global Privacy Control
              </span>
                <div
                    className={"flex flex-col justify-center items-center gap-2"}
                >
                  <p
                      className={
                        "not-italic font-normal text-sm text-[#F8FAFB] text-center"
                      }
                  >
                    Optery for Open Privacy Extension emits Global Privacy Control
                    signals to websites restricting the storage of your personal
                    information.
                  </p>
                  <button
                      className={
                        "flex items-center text-sm not-italic font-semibold underline decoration-1 text-[#F8FAFB]"
                      }
                      onClick={() =>
                          window.open("https://globalprivacycontrol.org/", "_blank")
                      }
                  >
                    Learn more about GPC
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={`flex justify-center items-center`}>
            <button onClick={handleGpcChange}>
              {gpcEnabled ? (
                  <img
                      src={"/icons/shieldon.svg"}
                      alt="Shield On"
                      className={"h-[333px] w-[278px]"}
                  />
              ) : (
                  <img
                      src={"/icons/shieldoff.svg"}
                      alt="Shield Off"
                      className={"h-[333px] w-[194px]"}
                  />
              )}
            </button>
          </div>
          <div className={"flex justify-center items-center flex-col gap-4"}>
            <button
                className={
                  "text-xs font-semibold not-italic bg-[#4D81F1] text-[#FFFFFF] rounded py-2.5 px-9"
                }
                onClick={() => window.open("https://www.optery.com/", "_blank")}
            >
              Optery Dashboard
            </button>
            <button className={"text-xs font-semibold not-italic text-[#FFFFFF]"}>
              Learn more about Optery
            </button>
          </div>
        </div>
      </div>
  );
};

export default App;
