// Send a message to the background script requesting the current tab ID
chrome.runtime.sendMessage({ type: "getCurrentTabId" }, function(response) {
  var currentTabId = response.tabId;
  console.log('currentTabId:', currentTabId);

  // Send a message to the background script requesting text to be summarized
  chrome.tabs.executeScript(currentTabId, { code: 'document.body.innerText' }, function (result) {
    var text = result[0];
    console.log('text:', text);
    chrome.runtime.sendMessage({ type: "summarizeText", text: text });
  });
});

// Listen for a response from the background script with the summarized text
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "summarizedText") {
    // Display the summarized text in a console log
    console.log('summarizedText:', message.summarizedText);
    // Send the summarized text back to the popup window
    chrome.runtime.sendMessage({ type: "summarizedText", summarizedText: message.summarizedText });
  }
});
