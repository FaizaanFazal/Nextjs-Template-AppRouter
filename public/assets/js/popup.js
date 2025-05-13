window.addEventListener("message", e => {
    if (e.data?.type === "LOGIN_WITH_GITHUB") {
        chrome.runtime.sendMessage({ type: "LOGIN_WITH_GITHUB" });
    }
});

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "AUTH_SUCCESS") {
        console.log("Popup: auth succeeded, closing now.");
        window.close();
    }
});

//  window.addEventListener("message", (e) => {
//         if (e.data?.type === "LOGIN_WITH_GITHUB") {
//           chrome.runtime.sendMessage({ type: "LOGIN_WITH_GITHUB" })
//         }
//         if (e.data?.type === "CLOSE_POPUP") {
//           window.close()
//         }
//       })