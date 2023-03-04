// // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// //     if (request.type === "summarizeText") {
// //       const text = document.querySelector("body").innerText;
// //       chrome.runtime.sendMessage({ type: "summarizeText", text });
// //     }
// //   });


// const form = document.querySelector("form");

// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const age = document.querySelector("input[name='age']:checked").value;
//   chrome.runtime.sendMessage({ type: "summarizeText", age }, (response) => {
//     chrome.runtime.sendMessage({ type: "summarizedText", summarizedText: response });
//   });
// });
// gpt code:



// Send a message to the background script requesting text to be summarized
chrome.runtime.sendMessage({ type: "summarizeText", text: document.body.innerText });

// Listen for a response from the background script with the summarized text
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "summarizedText") {
    // Display the summarized text in a console log
    console.log(message.summarizedText);
    // Send the summarized text back to the popup window
    chrome.runtime.sendMessage({ type: "summarizedText", summarizedText: message.summarizedText });
  }
});
