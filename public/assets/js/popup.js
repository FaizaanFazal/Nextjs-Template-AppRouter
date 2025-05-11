 window.addEventListener("message", e => {
        if (e.data?.type === "LOGIN_WITH_GITHUB") {
          chrome.runtime.sendMessage({ type: "LOGIN_WITH_GITHUB" });
        }
      });

      // When background signals AUTH_SUCCESS, close the popup
      chrome.runtime.onMessage.addListener(msg => {
        if (msg.type === "AUTH_SUCCESS") {
          window.close();
        }
      });