
// // Send a message to the background script requesting text to be summarized
// chrome.runtime.sendMessage({ type: "summarizeText", text: document.body.innerText });

// // Listen for a response from the background script with the summarized text
// chrome.runtime.onMessage.addListener((message) => {
//   if (message.type === "summarizedText") {
//     // Display the summarized text in a console log
//     console.log(message.summarizedText);
//     // Send the summarized text back to the popup window
//     chrome.runtime.sendMessage({ type: "summarizedText", summarizedText: message.summarizedText });
//   }
// });


// second version:

// Get the current tab's ID
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var currentTabId = tabs[0].id;

  // Send a message to the background script requesting text to be summarized
  chrome.tabs.executeScript(currentTabId, { code: 'document.body.innerText' }, function (result) {
    var text = result[0];
    chrome.runtime.sendMessage({ type: "summarizeText", text: text });
  });
});

// Listen for a response from the background script with the summarized text
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "summarizedText") {
    // Display the summarized text in a console log
    console.log(message.summarizedText);
    // Send the summarized text back to the popup window
    chrome.runtime.sendMessage({ type: "summarizedText", summarizedText: message.summarizedText });
  }
});
