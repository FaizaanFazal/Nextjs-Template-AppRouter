// assets/js/background.js
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type !== "LOGIN_WITH_GITHUB") return;

  const redirectUri = chrome.identity.getRedirectURL();
  const authUrl =
    `http://localhost:3000/api/auth/signin/github` +
    `?callbackUrl=${encodeURIComponent(redirectUri)}`;

  chrome.identity.launchWebAuthFlow(
    { url: authUrl, interactive: true },
    (redirectUrl) => {
      if (chrome.runtime.lastError || !redirectUrl) {
        console.error("OAuth failed:", chrome.runtime.lastError);
        return;
      }
      chrome.runtime.sendMessage({ type: "AUTH_SUCCESS" });
    }
  );
});
