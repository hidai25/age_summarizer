chrome.tabs.onActivated.addListener(function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTabId = tabs[0].id;
    console.log('currentTabId:', currentTabId);
  });
});({ active: true, currentWindow: true }, function (tabs) {
  var currentTabId = tabs[0].id;
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


chrome.tabs.onActivated.addListener(function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTabId = tabs[0].id;
    console.log('currentTabId:', currentTabId);
  });
});