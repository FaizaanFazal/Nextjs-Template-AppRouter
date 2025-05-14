// assets/js/background.js
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type !== "LOGIN_WITH_GITHUB") return;

  const redirectUri = chrome.identity.getRedirectURL();
  const authUrl =
    `http://localhost:3000/api/auth/signin/github` +
    `?callbackUrl=${encodeURIComponent(redirectUri)}` + `&authorizationParams[login]=`;
  console.log("Expected redirectUri:", redirectUri);
  chrome.identity.launchWebAuthFlow(
  { url: authUrl, interactive: true },
  (redirectUrl) => {
    console.log("Got redirectUrl:", redirectUrl);
    const err = chrome.runtime.lastError;
    if (err || !redirectUrl) {
      console.error("OAuth failed:", err?.message || err);
      chrome.runtime.sendMessage({
        type: "AUTH_COMPLETE",
        success: false,
        error: err?.message,
      });
      return;
    }
    console.log("OAuth success:", redirectUrl);
    chrome.runtime.sendMessage({ type: "AUTH_COMPLETE", success: true });
  }
);

});
