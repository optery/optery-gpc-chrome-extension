(function () {
  // Function to set the globalPrivacyControl property
  function setGlobalPrivacyControl(value) {
    Object.defineProperty(navigator, "globalPrivacyControl", {
      get: function () {
        return value;
      },
      set: function (newValue) {
        value = newValue;
      },
      configurable: true,
    });
  }

  // Listen for the custom event to get the gpcValue
  document.addEventListener("GPCValue", (event) => {
    const gpcValue = event.detail;
    setGlobalPrivacyControl(gpcValue);
  });
})();
